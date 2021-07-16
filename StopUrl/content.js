chrome.storage.sync.get('stopUrls', function (obj) {
	if(obj.stopUrls.length >0){
	    obj.stopUrls.forEach(function(url){
	    	if(document.URL.includes(url.trim())){
	    		console.log('got it, closing it');
	    		chrome.runtime.sendMessage({closeThis:true});
	    	}
	    })
	}
});