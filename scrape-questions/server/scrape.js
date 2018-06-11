const blockedQuestions = [
  {
    course: 'javascript',
    questionIds: [503093, 23569441, 5062614, 22343224, 9682092, 4351521, 21692646, 2353818, 5311334]
  },
  {
    course: 'git',
    questionIds: [49478]
  }
]

const Future = require('fibers/future');

Meteor.methods({
  getAnsweridForQuestion(qId) {
    const fut = new Future();
    let questions = 0;
    const answersURL = `https://api.stackexchange.com/2.2/questions/${qId}/answers?order=desc&sort=votes&site=stackoverflow&key=sPiAYn1bstS0kZde5pC5Yg((`
    const options = {
      "npmRequestOptions" : {"gzip" : true}
    };

    HTTP.get(answersURL, options, function(err, res) {
      if (err) {
        fut.return(false)
      } else {
        if (res && res.data && res.data.items && res.data.items.length > 0) {
          const items = res.data.items;
          fut.return(items[0].answer_id)
        } else {
          fut.return(false);
        }
      }
    });
    return fut.wait();
  },
  getAnswersFromIds(ids) {
    const fut = new Future();
    ids = ids.join(';');
    let questions = 0;
    const answersURL = `https://api.stackexchange.com/2.2/answers/${ids}?order=desc&sort=votes&site=stackoverflow&key=sPiAYn1bstS0kZde5pC5Yg((&filter=withbody`
    const options = {
      "npmRequestOptions" : {"gzip" : true}
    };

    HTTP.get(answersURL, options, function(err, res) {
      if (err) {
        console.log('error ');
        console.log(err);
        fut.return({ type: 'fail', error: err })
      } else {
        console.log('success');
        fut.return({ type: 'success', data: res })
      }
    });
    return fut.wait();
  },
  getQuestionsWithTagName: function (tag, page) {
    const fut = new Future();

    let questions = 0;
    const questionsUrl = `https://api.stackexchange.com/2.2/questions?order=desc&sort=votes&tagged=${tag}&site=stackoverflow&page=${page}&key=sPiAYn1bstS0kZde5pC5Yg((`
    console.log(questionsUrl);
    const options = {
      "npmRequestOptions" : {"gzip" : true}
    };

    HTTP.get(questionsUrl, options, function(err, res) {
      if (err) {
        console.log('error ');
        console.log(err);
        fut.return({ type: 'fail', error: err })
      } else {
        console.log('success');
        fut.return({ type: 'success', data: res })
      }
    });
    return fut.wait();
  },
  getQuestiions() {
    const courses = [
      { tag: 'css', tips: [] },
      // { tag: 'javascript', tips: [] },
      // { tag: 'git', tips: [] },
      // { tag: 'bash', tips: [] },
      // { tag: 'android', tips: [] },
      // { tag: 'python', tips: [] },
    ];

    courses.forEach(function (course) {
      let count = 0;
      let page = 0;
      let canScrape = true;

      while (count < 150 && canScrape) {
        page ++;
        console.log(count, canScrape, page);
        const res = Meteor.call('getQuestionsWithTagName', course.tag, page);
        if (res && res.type === 'success' && res.data && res.data.data && res.data.data.items.length > 0) {
          const items = res.data.data.items;

          count += items.length;
          const out = [];
          items.forEach(function ({title, question_id, accepted_answer_id}) {
            if (!accepted_answer_id) {
              const answerIdForQues = Meteor.call('getAnsweridForQuestion', question_id);
              if (answerIdForQues) {
                accepted_answer_id = answerIdForQues;
              }
            }
            out.push({ title, questionId: question_id, answerId: accepted_answer_id });
          });
          course.tips.push(...out)
          canScrape = res.data.data.has_more;
        } else {
          canScrape = false;
        }
      }
    });
    return courses;
  },
  saveQuestions() {
    const courses = Meteor.call('getQuestiions');
    let answerIds = [];
    if (courses && courses.length > 0) {
      courses.forEach(function (course) {
        console.log(course.tips.length);
        if (course && course.tips && course.tips.length > 0) {
          course.tips.forEach(function (tip) {
            Questions.insert({ course: course.tag, title: tip.title, questionId: tip.questionId, answerId: tip.answerId });
            answerIds.push(tip.answerId)
          });
        }
      });

      // get answers for each question
      let total = answerIds.length;

      while(answerIds.length > 0) {
        let max = 30;
        if (answerIds.length < 30) {
          max = answerIds.length;
        }
        const currentBatchAnswerIds = answerIds.slice(0, max);
        const resp = Meteor.call('getAnswersFromIds', currentBatchAnswerIds);
        if (resp && resp.data && resp.data.data) {
          const data = resp.data.data;
          if (data && data.items && data.items.length > 0) {
            const items = data.items;
            items.forEach(function (item) {
              Questions.update({ answerId: item.answer_id }, { $set: { body: item.body } })
            });
          }
        }

        answerIds = answerIds.slice(max);
      }
      Meteor.call('pullAnswersForMissingQuestions');
      console.log('while loop done');
    }
  },
  removeQuestion(id) {
    Questions.remove(id);
    return true;
  },
  pullAnswersForMissingQuestions() {
    let answerIds = Questions.find({ body: { $exists: false }}).map(obj => obj.answerId);

    // console.log(qIds);

    let total = answerIds.length;

    while(answerIds.length > 0) {
      let max = 30;
      if (answerIds.length < 30) {
        max = answerIds.length;
      }
      const currentBatchAnswerIds = answerIds.slice(0, max);
      const resp = Meteor.call('getAnswersFromIds', currentBatchAnswerIds);
      if (resp && resp.data && resp.data.data) {
        const data = resp.data.data;
        // console.log(data);
        if (data && data.items && data.items.length > 0) {
          const items = data.items;
          items.forEach(function (item) {
            Questions.update({ answerId: item.answer_id }, { $set: { body: item.body } })
          });
        }
      }

      answerIds = answerIds.slice(max);
    }
  }
});