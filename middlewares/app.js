const express=require('express');

const app=express();


app.get('/', (req, res, next)=>{
  res.send("Hello from server at 3000.");
})

const PORT=3000
app.listen(PORT, ()=>{
  console.log("Server running at  ", PORT)
})