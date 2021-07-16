chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if(message.closeThis) {
    chrome.tabs.remove(sender.tab.id);
    chrome.tabs.create({url:'javascript:document.write("<h1>Such a shame !!!!!!! again you are deviating</h1>")'});
  }
});