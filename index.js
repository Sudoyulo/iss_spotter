
const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  
  console.log('It worked! Returned IP:' , ip);
  return ip;
});

fetchCoordsByIP("5e8a9b00-53e2-11ec-8583-37c0c99eb1b0", (err, data) => console.log(err,data));