```
Meteor.call('saveQuestions', (error, result) => {
  if (error) {
    console.log(error);
  } else {
    console.log(result);
  }
});
```

```
ques = Questions.find().fetch()
out = [];
ques.forEach(function (tip) {
  out.push({
    title: tip.title,
    body: tip.body,
    source: 'so',
    questionId: tip.questionId,
  });
});
copy(out)
```