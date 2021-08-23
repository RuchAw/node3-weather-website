const request=require("request")

const forecast=(longitude,latitude,callback) => {
    const url="http://api.weatherstack.com/current?access_key=0472edba1a7db2954e16eca98fdcad6b&query="+latitude+","+longitude
    request({url,json: true},(error,{body})=>{
        if (error){
            callback("Unable to connect to weather service",undefined)
        }else if(body.error){
            callback("Unable to find location",undefined)
        }else{     
            const currentWeather=body.current
            callback(undefined,"The weather is "+currentWeather.weather_descriptions[0]+", It is currently "+currentWeather.temperature+" degrees out, feels like "+currentWeather.feelslike +". There is a "+currentWeather.precip+" % chance of rain today.")
        }
    })
}


  module.exports=forecast