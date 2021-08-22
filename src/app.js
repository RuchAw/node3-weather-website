const path=require("path")
const express=require("express")
const hbs=require("hbs")
const geocode=require("./utils/geocode")
const forecast=require("./utils/forecast")

// Initiate an Express server
const app=express()

//define paths for Express config
const publicDirectorypath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,"../templates/views")
const partialsPath=path.join(__dirname,"../templates/partials")

// Setup handlebars engine and views location   
app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectorypath))

app.get("",(req,res)=>{
    res.render("index",{
        title: "Weather",
        name: "Anas Belhaddad"
    })
})

app.get("/About",(req,res)=>{
    res.render("about",{
        title:"About",
        name: "Anas Belhaddad"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help",
        name:"Anas Belhaddad",
        message:"Welcome to the help page"
    })
})


app.get("/weather",(req,res)=>{
    if(!req.query.adress){
        return res.send({
            error: "An adress should be provided"
        })
    }

    const adress=req.query.adress

    geocode(adress,(error,{longitude, latitude, location}={})=>{
    
        if (error) return res.send({
            error: error
        })
        
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) return res.send({
                error: error
            })

            res.send({
                forecast: forecastData,
                location: location,
                adress: adress
            })
          })
    })
 
})


app.get("/products",(req,res)=>{
    if(!req.query.search) {
        return res.send({
            error: "you must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get("/help/*",(req,res)=>{
    res.render("404",{
        title: "404 Page not found",
        message: "Help article not found please try links below",
        name: "Anas Belhaddad"
    })
})

app.get("*",(req,res)=>{
    res.render("404",{
        title: "404 Page not found",
        message: "Page not found please try links below",
        name: "Anas Belhaddad"
    })
})

app.listen(3000,()=>{
    console.log("Server is up on port 3000")
})