chrome.browserAction.onClicked.addListener(function (tab) {
	// for the current tab, inject the "inject.js" file & execute it
  dla_studentow = /usosweb.*dla_stud/g
  moj_usosweb = /usosweb.*home/g
  // usos = /usosweb/g

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

});
