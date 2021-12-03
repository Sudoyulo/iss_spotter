const request = require("request");

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API

  request('https://api.ipify.org?format=json', (err, resp) => {

    if (err) {
      return callback(err, null);
    }
    
    if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching IP. Response: ${resp}`;
      callback(Error(msg), null);
      return;
    }

    if (!err) {
      const data = JSON.parse(resp.body);
      if (resp.length === 0)
        callback("Not found", null);
      else
        callback(null, data.ip); //data.ip is typeof string
    }
    return;
  });
};

const fetchCoordsByIP = (apikey, callback) => {

  request('https://api.freegeoip.app/json/?apikey=' + apikey, (err, resp) => {

    if (err) {
      return callback(err, null);
    }
    
    if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching IP coordinates. Response: ${resp}`;
      callback(Error(msg), null);
      return;
    }

    if (!err) {
      // console.log(resp.body);
      if (resp.body.length === 0)
        callback("Not found", null);
      else {
        const data = JSON.parse(resp.body);
        const coords = { latitude: data.latitude, longitude: data.longitude };
        return callback(null, coords); //data.ip is typeof string
      }
    }
    return;
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  // console.log(coords);

  request("https://iss-pass.herokuapp.com/json/?lat=" + coords.latitude + "&lon=" + coords.longitude, (err, resp) => {

    if (err) {
      return callback(err, null);
    }
    
    if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching fly by times. Response: ${resp}`;
      callback(Error(msg), null);
      return;
    }

    if (!err) {
      if (resp.length === 0)
        callback("Not found", null);
      else {
        const data = JSON.parse(resp.body);
        // console.log(data)
        callback(null, data); //data.ip is typeof string
      }
    }
    return;
  });
};

//guessing from here

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP("5e8a9b00-53e2-11ec-8583-37c0c99eb1b0", (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        // console.log("HMMM???", nextPasses)

        callback(null, nextPasses.response);
      });
    });
  });
};


// module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes , nextISSTimesForMyLocation};
module.exports = { nextISSTimesForMyLocation};