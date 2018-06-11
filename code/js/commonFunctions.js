getRandomFromArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const setTipFromCourses = (coursesList) => {
  const course = getRandomFromArray(coursesList);
  if (course) {
    const cName = `ct-${course}`;
    chrome.storage.local.get([cName], function(courseTips) {
      if (courseTips && courseTips[cName]) {
        const courseTipsList = courseTips[cName];
        const tipsSource = getRandomFromArray(courseTipsList);

        if (tipsSource) {
          const tipInfo = {
            author: tipsSource.Author,
            format: tipsSource.format,
            url: tipsSource.url,
            tip: getRandomFromArray(tipsSource.tips),
            course,
          }

          const courseInfo = courses.find(obj => obj.key ===  course);
          if (courseInfo) {
            tipInfo.courseName = courseInfo.name;
          }
          showTip(tipInfo);
        }
      } else {
        setNextTip();
      }
    })
  }
}

setNextTip = (coursesList) => {
  if (coursesList && coursesList.length > 0) {
    setTipFromCourses(coursesList);
  } else {
    chrome.storage.local.get(['ct-courses'], function(result) {
      // console.log('Value currently is ', result);
      if (result && result['ct-courses']) {
        setTipFromCourses(result['ct-courses']);
      }
    });
  }
};

downloadSelectedCourses = (selectedCourses) => {
  // console.log({selectedCourses});
  const totlaCourses = selectedCourses.length;
  showDownloadProgressSection();

  for (let i = 0; i < selectedCourses.length; i ++) {
    document.getElementById('downloadingCourseName').innerHTML = selectedCourses[i];
    const url = courses.find(obj => obj.key === selectedCourses[i]).url;
    const isFinal = i === (selectedCourses.length - 1)
    downloadFile(url, selectedCourses[i], isFinal)
  }
};

downloadFile = (url, courseName, isFinal) => {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let data = xhttp.response;
      // console.log('download completed');
      data = eval(data);

      const obj = {};
      obj[`ct-${courseName}`] = data;
      chrome.storage.local.set(obj, function() {
        // console.log('value is set to ' + data);
        if (isFinal) {
          setNextTip();
          document.querySelector('.downloading-course').classList.add('hidden');
          document.querySelector('.select-course').classList.add('hidden');
          document.querySelector('.tip').classList.remove('hidden');
        }
      });
    }
  };

  xhttp.addEventListener("progress", function (evt) {
    if(evt.lengthComputable) {
      var percentComplete = evt.loaded / evt.total;
      const progressMsg = `${Math.round(percentComplete * 100)}% (${evt.loaded} / ${evt.total} B)`
      document.getElementById('downloadingProgress').innerHTML = progressMsg;
      // console.log(evt.loaded, evt.total);
      // console.log(evt);
      // console.log(percentComplete);
    }
  }, false);

  xhttp.open("GET", url, true);
  xhttp.send();
}

clearCache = () => {
  chrome.storage.local.clear(function() {
    var error = chrome.runtime.lastError;
    if (error) {
      // console.error(error);
    }
  });
}