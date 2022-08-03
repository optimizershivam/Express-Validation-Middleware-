const express = require('express')
const fs = require("fs")
// const { nextTick } = require('process')

const app = express()

const read = fs.readFileSync("./movies.json","utf-8")
const movies_data = JSON.parse(read)
app.use(express.json())

const check = (req,res,next) => {
const  { ID, Name, Rating, Description, Genre, Cast }  = req.body

if(typeof(ID)==="number" && typeof(Name)==="string" && typeof(Rating)==="number" && typeof(Description)=="string" && typeof(Genre)==="string" && typeof(Cast)==="object")

{
  next()
    
   
}
else{
    res.sendStatus(400)
}

}
app.use(check)



app.post("/data",(req,res)=>{
    const post_data = req.body
    
    movies_data.movies.push(post_data)
    fs.writeFileSync("./movies.json",JSON.stringify(movies_data),"utf-8")
    res.send(post_data)
})

app.listen(8080,()=> {
    console.log("server started")
})