var api_url = "http://localhost:8080/api/v1/stars/";

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

// https://github.com/jjNford/chrome-ex-oauth2

// почему не используется identity:
// а) не работают кукисы
// б) нет адресной строки. т.к. у нас аутентификация через гитхаб, я не хочу вводить свой пароль на странице без УРЛа


// как это работает:
// запускаем window.oauth2.start()
// она отрабоатывает и помещает токен в локалсторадж
// подписываемся на изменения локалстораджа и получаем токен %)

chrome.browserAction.onClicked.addListener(function(tab) {
//  chrome.storage.sync.clear();


  chrome.storage.sync.get('oauth2_token', function(items){
    var token = items['oauth2_token'];
    if (token) {
      publishLink(tab.url, token);
    } else {
      window.oauth2.start();

      // потенциальная проблема навешивания кучи Listeners
      //TODO: добавить фильтр
      chrome.storage.onChanged.addListener(function(changes){
        var tokenData = changes['oauth2_token'];


        if (tokenData) {
          publishLink(tab.url, tokenData.newValue);
        }
      });
    }

  });
});
