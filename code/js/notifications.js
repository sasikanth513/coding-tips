const showNotification = (notif, seenIds) => {
  document.querySelector('#notifications').classList.remove('hidden');
  document.querySelector('.notifMsg').innerHTML = notif.html;
  var closeNotifsBtn = document.getElementById('closeNotifs');
  closeNotifsBtn.addEventListener('click', function() {
    document.querySelector('#notifications').classList.add('hidden');
    seenIds.push(notif.id);
    chrome.storage.local.set({"ct-read-notifications": seenIds}, function() {
      // console.log('value is set to ' + courses);
    });
  });
};

const showLatestNotification = (seenIds) => {
  const latestNotif = CTNotifications[CTNotifications.length - 1];
  if (latestNotif) {
    showNotification(latestNotif, seenIds);
  }
};

showCTNotifications = function() {
  chrome.storage.local.get(['ct-read-notifications'], function(result) {
    // console.log('Value currently is ', result);
    if (result && result['ct-read-notifications']) {
      const readIds = result['ct-read-notifications'];
      const allNotifIds = CTNotifications.map(obj => obj.id);
      if (allNotifIds && allNotifIds.length > 0) {
        const lastId = allNotifIds[allNotifIds.length - 1]
        if (readIds.indexOf(lastId) === -1) {
          showLatestNotification(readIds);
        }
      }
    } else {
      showLatestNotification([]);
    }
  });
}