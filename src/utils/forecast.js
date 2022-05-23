const request = require("postman-request")



const forecast = (longitude, latitude, callback) => {

    const url ="http://api.weatherstack.com/current?access_key=b230502ec376875d6d544ba89387b4ae&query=" + longitude + ","+ latitude+"&units=m"

    request({url: url, json:true}, (error, response)=> {
        if (error) {
            callback(error, undefined)
          } else if(response.body.error){
            callback(response.body.error.info, undefined)
        
          }
          
          else {
            
            const temp = response.body.current.temperature;
            const tempfeel = response.body.current.feelslike;
        
            //console.log("it is " + temp + " degrees outside. It feels like " + tempfeel + " degrees outside")
            callback(undefined,
              response.body.current.weather_descriptions[0] +
                " it is " +
                temp +
                " degrees outside. It feels like " +
                tempfeel +
                " degrees outside"
            );
          }
    })

  }


module.exports = forecast