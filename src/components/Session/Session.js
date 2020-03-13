import * as jwt_decode from 'jwt-decode';

/// Session helper class for loading/setting local storage of user
var Session = (function() {
    var _info = null;

    /// Load the current user auth
    var loadUser = function() {
        // Get the stored auth and pase
        var token = localStorage.getItem('user');
        if (!token) 
            return null;
        var parsedToken = JSON.parse(token);
        if (parsedToken && parsedToken.api_token) {
            // Decode the token
            _info = jwt_decode(parsedToken.api_token);
            _info.api_token = parsedToken.api_token;
            // Convert php time to date object
            _info.expiry_time = new Date(_info.expiry_time * 1000);
            
            // validate it's expiry to make sure it's valid
            Session.validate(_info.expiry_time);

            return _info;
        } else {
            return null;
        }
    };

    var getUser = function() {
        if (_info) {
            return _info;
        } else {
            _info = this.loadUser();
            return _info;
        }
    }

    /// Set the current user auth
    var setUser = function(apiToken) {
        localStorage.setItem('user', JSON.stringify({
            api_token: apiToken,
        }));
        _info = null;
    };

    /// Checks if user auth hasn't expired, resets if it has
    var validate = function (expiryDate) {
        if (expiryDate <= new Date()) {
            Session.setUser(null);
            window.location.replace("/");
        }
    }
  
    return {
        loadUser: loadUser,
        setUser: setUser,
        getUser: getUser,
        validate: validate,
    }
  
  })();
  
  export default Session;