
// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});




// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
  
//   // console.log('It worked! Returned IP:' , ip);
//   return ip;
// });

// fetchCoordsByIP("5e8a9b00-53e2-11ec-8583-37c0c99eb1b0", (err, data) => console.log(err,data));

// let coords = { latitude: 49.2311, longitude: -122.956 };

// fetchISSFlyOverTimes(coords, (err, data) => console.log(err,data));
// fetchISSFlyOverTimes(coords, (err, data) => {

//   if (err)
//     console.log("error");
//   else
//     console.log(data);

// });