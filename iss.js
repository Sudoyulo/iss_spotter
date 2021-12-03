const request = require("request");

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API

  request('https://api.ipify.org?format=json', (err, body) => {

    if (err) {
      return callback(err, null);
    }
    
    if (body.statusCode !== 200) {
      const msg = `Status Code ${body.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    if (!err) {
      const data = JSON.parse(body.body);
      if (body.length === 0)
        callback("Not found", null);
      else
        callback(null, data.ip); //data.ip is typeof string
    }
    return;
  });
};

module.exports = { fetchMyIP };