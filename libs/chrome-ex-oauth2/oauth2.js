(function() {
    window.oauth2 = {

        access_token_url: "http://localhost:8080/oauth/token",
        authorization_url: "http://localhost:8080/oauth/authorize",
        client_id: "9583a5e9d8ced23c04009278d8be4891f98c1a0b75f0761a43ec29d659127122",
        redirect_url: "http://localhost:8080/blank.html",
        scopes: [],

      /**
       * Starts the authorization process.
       */
      start: function() {
        var url = this.authorization_url + "?client_id=" + this.client_id + "&response_type=token" + "&redirect_uri=" + this.redirect_url + "&scopes=";
        for(var i in this.scopes) {
          url += this.scopes[i];
        }
        chrome.tabs.create({url: url, active: true});
      },

        key: "oauth2_token",

        /**
         * Finishes the oauth2 process by exchanging the given authorization code for an
         * authorization token. The authroiztion token is saved to the browsers local storage.
         * If the redirect page does not return an authorization code or an error occures when 
         * exchanging the authorization code for an authorization token then the oauth2 process dies
         * and the authorization tab is closed.
         * 
         * @param url The url of the redirect page specified in the authorization request.
         */
        finish: function(hash) {
          var token = hash.match(/#access_token=(\w+).*/)[1];

          var data = {};
          data[this.key] = token;

          chrome.storage.sync.set(data);

          chrome.tabs.getCurrent(function(tab) {
            chrome.tabs.remove(tab.id);
          });

        },

        /**
         * Retreives the authorization token from local storage.
         *
         * @return Authorization token if it exists, null if not.
         */
        getToken: function() {
            return window.localStorage.getItem(this.key);
        },

        /**
         * Clears the authorization token from the local storage.
         */
        clearToken: function() {
            delete window.localStorage.removeItem(this.key);
        }
    }
})();