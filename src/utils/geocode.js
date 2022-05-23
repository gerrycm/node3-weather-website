const request = require("postman-request")

const geocode = (address, callback)=>{
    const url = "http://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZ2VycnlrZXIiLCJhIjoiY2wzOHBmZHQ3MDIzdjNicWY3NTB4YjQwcyJ9.UKLlPvduuHBTFS3NPQN3TA"
   console.log(url)
    request({url: url, json:true}, (error, response)=> {
         if (error){
             callback(error)
             //callback("Unable to connect to location services!", undefined)
         }
         else if (response.body.error){
             callback(response.body.error, undefined)
 
           }  else{
                 if (response.body.features.length === 0){
                     callback("no records found")
                 }
                 else{
                     //console.log(body.features[0].place_name);
                     //console.log(body.features[0].center[0] + " " + body.features[0].center[1]);
                   
                     const latitude = response.body.features[0].center[1];
                     const longitude = response.body.features[0].center[0];
                     callback(undefined,{longitude,latitude, location: response.body.features[0].place_name})
                 }
                   
                 }
    })
 
 
 }

 module.exports = geocode