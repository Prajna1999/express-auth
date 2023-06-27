const express = require('express');

const app = express();

// /demo 
app.use(express.json())

app.get('/', (req, res, next) => {
  res.send("Hello from server at 3000.");
})

const PORT = 3000
app.listen(PORT, () => {
  console.log("Server running at  ", PORT)
})