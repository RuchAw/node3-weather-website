const request=require("request")

const geocode = (adress,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(adress)+".json?access_token=pk.eyJ1IjoiYW5hcy1iZWxoYWRkYWQiLCJhIjoiY2tzYXRsOXNzMDBhNTJ3bjVlYXJ3d2pjeiJ9.Q6EmGj6I36l98tAMbqtkOw"
    request({url,json: true},(error,{body})=>{
        if (error){
            callback("Unable to connect to location services!",undefined)
        }else if(!body.features[0]){
            callback("Please try another valid location",undefined)
        }else{
            callback(undefined,{
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports=geocode