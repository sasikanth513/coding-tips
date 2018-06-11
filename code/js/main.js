function generateNumber() {
  return Math.floor(Math.random() * tipsList.length);
}

function showTip(tipInfo) {
  document.querySelector('.undo-btn').classList.remove('hide')
  chrome.storage.local.get(['ct-currenttip'], function(result) {
    if (result && result['ct-currenttip']) {
      chrome.storage.local.set({"ct-lasttip": result['ct-currenttip']}, function() {
        chrome.storage.local.set({"ct-currenttip": tipInfo}, function() {
        });
      });
    } else {
      chrome.storage.local.set({"ct-lasttip": tipInfo}, function() {
        chrome.storage.local.set({"ct-currenttip": tipInfo}, function() {
        });
      });
    }
  });
  
  var tip = tipInfo.tip;
  var tipElement = document.querySelector('.js-tip');
  var tipHeading = document.querySelector('.tip-heading');
  var tipTag = document.querySelector('.source-course');
  var tipAuthor = document.querySelector('.course-author');

  let html      = tip.body;

  if (tipInfo.format === 'markdown') {
    var noMorePsExt = {
      type: 'output',
      filter: function(text, converter) {
        var re = /<\/?p[^>]*>/ig;
        text = text.replace(re, '');
        return text;
      }
    };
    var converter = new showdown.Converter({extensions: [noMorePsExt]});
    html      = converter.makeHtml(html);
  }
  
  tipElement.innerHTML = html;
  tipHeading.innerHTML = tip.title;

  if (tipInfo.courseName) {
    tipTag.innerHTML = tipInfo.courseName;
  }

  if (tipInfo.author) {
    let sourceURL = tipInfo.url;
    if (tip && tip.source === "so" && tip.questionId) {
      sourceURL = `https://stackoverflow.com/questions/${tip.questionId}`
    }
    tipAuthor.innerHTML = `source: <a href="${sourceURL}">${tipInfo.author}</a>`
  }
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function onTipButtonClick() {
  var tipButton = document.querySelector('.tip-button');
  tipButton.addEventListener('click', () => {
    setNextTip();
  });
}

function onPreviousButtonClick() {
  var tipButton = document.querySelector('.undo-btn');
  tipButton.addEventListener('click', () => {
    chrome.storage.local.get(['ct-lasttip'], function(result) {
      if (result && result['ct-lasttip']) {
        showTip(result['ct-lasttip']);
        document.querySelector('.undo-btn').classList.add('hide');
      }
    });
  });
}

const showSelectCourses = () => {
	document.querySelector('.tip').classList.add('hidden');
  document.querySelector('.downloading-course').classList.add('hidden');
	document.querySelector('.select-course').classList.remove('hidden');

  chrome.storage.local.get(['ct-courses'], function(result) {
    if (result && result['ct-courses']) {
      const selectedCourses = result['ct-courses'];
      courses.forEach(function (course) {
        if (selectedCourses.indexOf(course) > -1) {
          $(`#${course.key}`).prop('checked', true);
        } else {
          $(`#${course.key}`).prop('checked', false);
        }
      });
    }
  });
};

const showDownloadProgressSection = () => {
  document.querySelector('.select-course').classList.add('hidden');
  document.querySelector('.tip').classList.add('hidden');
  document.querySelector('.downloading-course').classList.remove('hidden');
}

const hideDownloadProgressSection = () => {
  document.querySelector('.select-course').classList.add('hidden');
  document.querySelector('.tip').classList.add('hidden');
  document.querySelector('.downloading-course').classList.add('hidden');
}

const addAvailableCourses = () => {
	courses.forEach(function (course) {
		const list = document.querySelector('.courses-list');
    const exist = document.getElementById(course.key);
    if (!exist) {
  		list.insertAdjacentHTML('beforeend', `
  			<div class="col-md-6">
  				<input type="checkbox" id="${course.key}" name="${course.key}" value="" />
  				<label for="${course.key}">
  					<span></span>
  					${course.name}
  				</label>
  			</div>
  		`);
    }
	});
}

const showMessage = (type, message) => {
	const html = `<strong>${type}!</strong> ${message}`;
	document.querySelector('.msg-body').innerHTML = html;
	document.querySelector('.msg').classList.remove('hidden');
};

const hideMessage = (type, message) => {
	document.querySelector('.msg').classList.add('hidden');
};

const onSaveCoursesButtonClick = () => {
  var tipButton = document.getElementById('saveCourses');
  function saveCoursesFn() {
    hideMessage();
    const courses = [];

    var sList = "";
    $('.courses-list input[type=checkbox]').each(function () {
      if (this.checked) {
        courses.push(this.id);
      }
    });

    if (courses.length === 0) {
      showMessage('Warning', 'Please select at least one course to show tips');
      return;
    }
    downloadSelectedCourses(courses);
    chrome.storage.local.set({"ct-courses": courses}, function() {
      // console.log('value is set to ' + courses);
    });
  }
  tipButton.addEventListener('click', saveCoursesFn);
}
const checkIfCoursesSelected = () => {
	chrome.storage.local.get(['ct-courses'], function(result) {
    // console.log('Value currently is ', result);
    if (result && result['ct-courses']) {
    	document.querySelector('.tip').classList.remove('hidden');
      setNextTip(result);
    } else {
    	showSelectCourses();
    	addAvailableCourses();
    	onSaveCoursesButtonClick();
    }
  });
}

function onShowCoursesClick() {
  var showCoursesButton = document.getElementById('showCourses');
  showCoursesButton.addEventListener('click', function() {
    hideMessage();
    showSelectCourses();
    addAvailableCourses();
    onSaveCoursesButtonClick();
  });
}

function onResetClick() {
  var resetButton = document.getElementById('resetCache');
  resetButton.addEventListener('click', function() {
    hideMessage();
    const res = confirm('Are you sure you want to reset everything?');
    if (res) {
      clearCache();
      addAvailableCourses();
      showSelectCourses();
      onSaveCoursesButtonClick();
    }
  });
}

function onCancelCoursesClick() {
  var cancelButton = document.getElementById('cancelSelectCourses');
  cancelButton.addEventListener('click', function() {
    hideMessage();
    chrome.storage.local.get(['ct-courses'], function(result) {
      // console.log('Value currently is ', result);
      if (result && result['ct-courses']) {
        document.querySelector('.downloading-course').classList.add('hidden');
        document.querySelector('.select-course').classList.add('hidden');
        document.querySelector('.tip').classList.remove('hidden');
        setNextTip(result);
      } else {
        alert("You don't have any courses selected please select at least one course to see tips.");
      }
    });
    
  });
}

const bindEventListeners = () => {
	onTipButtonClick();
  onPreviousButtonClick();
  onShowCoursesClick();
  onResetClick();
  onCancelCoursesClick();
}
// to generate a tip
bindEventListeners();
checkIfCoursesSelected();
showCTNotifications();