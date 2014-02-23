var api_url = "http://localhost:3000/api/v1/stars/";
var oauth_url = 'http://localhost:3000/oauth/authorize?client_id=9583a5e9d8ced23c04009278d8be4891f98c1a0b75f0761a43ec29d659127122&redirect_uri=https%3A%2F%2Foioklhkaeijpcnljalielofdaikhlknm.chromiumapp.org%2F&response_type=token';

var createParams = function(url, token){
  return "star[url]=" + url + "&" + "access_token=" + token;
};

var publishLink = function(url, token){
  var req = new XMLHttpRequest();
  req.open("POST", api_url, true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  var params = createParams(url, token);
  req.send(params);
};

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.identity.launchWebAuthFlow({url: oauth_url, interactive: true}, function(redirect_url){
    var matcher = new RegExp('.*#access_token=(.*?)&.*');
    var results = redirect_url.match(matcher);
    var token = results[1];

    console.log(token)

    publishLink(tab.url, token);
  });
});
