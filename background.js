var api_url = "http://localhost:3000/api/v1/stars/";

var tabCompleted = function(tabId){
    chrome.pageAction.show(tabId);
};

var publishLink = function(url){
    var params = "star[url]=" + url;
    var req = new XMLHttpRequest();
    req.open("POST", api_url, true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.send(params);
};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo){
    if(changeInfo.status=='complete'){
        tabCompleted(tabId);
    }
});

chrome.pageAction.onClicked.addListener(function(tab) {
    publishLink(tab.url);
});
