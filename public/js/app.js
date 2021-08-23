const fetching=(adress)=>{
    fetch("/weather?adress="+adress).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            console.log(data.error)
        }else{
        console.log(data.location,"\n"+data.forecast)
        }
    })
})}



const weatherForm=document.querySelector("form")
const search=document.querySelector("input")
const messageOne= document.querySelector("#message-one")
const messageTwo= document.querySelector("#message-two")

// messageOne.textContent="From JavaScript"

weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()

    const location=search.value
    messageOne.textContent="Loading weather, please wait ..."
    messageTwo.textContent=""

    fetch("http://localhost:3000/weather?adress="+location).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            messageOne.textContent=""
            messageTwo.textContent=data.error     
        }else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
        }
    })
})
})