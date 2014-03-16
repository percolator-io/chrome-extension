(function() {
    window.oauth2 = {

        access_token_url: "http://percolator.io/oauth/token",
        authorization_url: "http://percolator.io/oauth/authorize",
        client_id: "90a15e2c122b779df7742b8c3b278bca0479e7223436b04b4229f1e2ee0a6f71",
        redirect_url: "http://percolator.io/blank.html",
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