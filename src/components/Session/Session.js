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

    /// Gets the current signed in user credentials. Can be null if not signed in
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
            console.log("Signed out user, credentials have expired");
            window.location.replace(process.env.PUBLIC_URL + "/?expired=true");
        }
    }

    /// Checks if an admin user is signed into the system
    var isAdminUser = function() {
        if (!_info)
            Session.getUser();
        return _info && _info.user_type == "admin";
    }

    /// Checks if the current user is that user type or higher
    var isUserTypeOrAbove = function(userType) {
        var usr = this.getUser();
        if (usr)
        {
            var accountTypeEnum = {
                "staff": 0,
                "management": 1,
                "admin": 2,
            };
            return accountTypeEnum[usr.user_type] >= accountTypeEnum[userType];
        }
        return false;
    }

    /// Checks if a user is signed into the system
    var isSignedIn = function () {
        return _info != null;
    }

    return {
        loadUser: loadUser,
        setUser: setUser,
        getUser: getUser,
        validate: validate,
        isAdminUser: isAdminUser,
        isSignedIn : isSignedIn,
        isUserTypeOrAbove: isUserTypeOrAbove,
    }
  
  })();
  
  export default Session;