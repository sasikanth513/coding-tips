const downloadUpdatedTips = (url, course) => {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let data = xhttp.response;
      // console.log('download completed');
      data = eval(data);

      const setObj = {};
      setObj[`ct-${course.key}`] = data;
      chrome.storage.local.set(setObj, function() {
      });

      chrome.storage.local.get(['ct-versions'], function(result) {
        let versions = [];
        if (result && result['ct-versions']) {
          versions = result['ct-versions'];
        }

        const exists = versions.find(obj => obj.key === course.key);
        if (!exists) {
          versions.push(course);
        } else {
          versions.forEach(function (version) {
            if (version.key === course.key) {
              version.version = course.version;
            }
          });
        }

        const setVersionObj = {};
        setVersionObj[`ct-versions`] = versions;
        chrome.storage.local.set(setVersionObj, function() {
        });
      });
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

const readUpdatedVersions = (callback) => {
  const url = 'https://gist.githubusercontent.com/sasikanth513/244b6b2b4943c9e08c4d51469fc05467/raw';

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let data = xhttp.response;
      // console.log('download completed');
      data = eval(data);
      // console.log('latest versions', data);
      callback(data);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

const checkForUpdatedCourses = (selectedCourses) => {
  chrome.storage.local.get(['ct-versions'], function(result) {
    // console.log('Value currently is ', result);
    let versions = [];

    if (result && result['ct-versions']) {
     versions = result['ct-versions'];
    }
    // console.log('local versions ', versions);
    readUpdatedVersions((coursesInfo) => {
      coursesInfo.forEach(function (course) {
        const exist = versions.find(obj => obj.key === course.key);
        if (!exist || exist.version !== course.version) {
          const courseData = courses.find(obj => obj.key === course.key);
          if (courseData && courseData.url) {
            if (selectedCourses.indexOf(course.key) > -1) {
              // console.log('downloading updates for ', course);
              downloadUpdatedTips(courseData.url, course)
            }
          }
        }
      });
    })
  });
}

const getSelectedCourses = () => {
  chrome.storage.local.get(['ct-courses'], function(result) {
    if (result && result['ct-courses']) {
      const selectedCourses = result['ct-courses'] || [];
      checkForUpdatedCourses(selectedCourses)
    }
  });
}

getSelectedCourses();