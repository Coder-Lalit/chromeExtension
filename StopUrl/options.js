function save_options() {
  var urlList = (document.getElementById('urlList').value).split(',');
  
  chrome.storage.sync.set({
    stopUrls: urlList
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.set({
    stopUrls: ''
  }, function() {
    document.getElementById('urlList').value='';
    var status = document.getElementById('status');
    status.textContent = 'Options reset.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function store_options() {
  chrome.storage.sync.get(
    ['stopUrls']
  , function(items) {
    var value = items.stopUrls===undefined ?'':items.stopUrls;;
    document.getElementById('urlList').value=value;
  });
}
document.addEventListener('DOMContentLoaded', store_options);
document.getElementById('save').addEventListener('click',save_options);
document.getElementById('reset').addEventListener('click',restore_options);