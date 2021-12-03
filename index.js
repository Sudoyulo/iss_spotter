
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  
  // console.log('It worked! Returned IP:' , ip);
  return ip;
});

// fetchCoordsByIP("5e8a9b00-53e2-11ec-8583-37c0c99eb1b0", (err, data) => console.log(err,data));

let coords = { latitude: 49.2311, longitude: -122.956 };

// fetchISSFlyOverTimes(coords, (err, data) => console.log(err,data));
fetchISSFlyOverTimes(coords, (err, data) => {

  if (err)
    console.log("error");
  else
    console.log(data);

});