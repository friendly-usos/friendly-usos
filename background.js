var run_extension = true

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

  if(!run_extension) return

  dla_studentow = /usosweb.*dla_stud/g
  moj_usosweb = /usosweb.*home/g
  usos = /usosweb/g

  if (changeInfo.status == 'complete' && tab.active) {

    if(tab.url.match(dla_studentow)) {
      chrome.tabs.executeScript(tab.ib, {
        file: 'dla_studentow.js'
      });
    }
    
    if(tab.url.match(moj_usosweb)) {
      chrome.tabs.executeScript(tab.ib, {
        file: 'moj_usosweb.js'
      });
    }

    if(tab.url.match(usos)) {
      chrome.tabs.executeScript(tab.ib, {
        file: '/tooltips.js'
      });
      chrome.tabs.executeScript(tab.ib, {
        file: '/menu.js'
      });
    }
  }
});

chrome.browserAction.onClicked.addListener(function(tab) {
  run_extension = !run_extension
  chrome.tabs.reload(tab.id)
})
