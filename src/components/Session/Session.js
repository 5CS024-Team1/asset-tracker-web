import * as jwt_decode from 'jwt-decode';

/// Session helper class for loading/setting local storage of user
var Session = (function() {
    var _info = null;

    var loadUser = function() {
        if (_info)
            return _info;
        
        var token = localStorage.getItem('user');
        if (!token) 
            return null;
        var parsedToken = JSON.parse(token);
        if (parsedToken && parsedToken.api_token) {
            _info = jwt_decode(parsedToken.api_token);
            _info.api_token = parsedToken.api_token;
            return _info;
        } else {
            return null;
        }
    };

    var setUser = function(apiToken) {
        localStorage.setItem('user', JSON.stringify({
            api_token: apiToken,
        }));
        _info = null;
    };
  
    return {
        loadUser: loadUser,
        setUser: setUser,
    }
  
  })();
  
  export default Session;