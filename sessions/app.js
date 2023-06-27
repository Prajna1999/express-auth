const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');

const { MongoClient, ServerApiVersion } = require('mongodb');

// mongodb sessions store
const MongoStore = require('connect-mongo')(session);

const app = express();
app.set('trust proxy')
// connect with the mongodb cloud



const uri = "mongodb+srv://prajna:<password>@cluster0.86uy7gx.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },

  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("express-auth").collection("sessions");
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}



app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const sessionStore = new MongoStore({
  mongooseConnection: client,
  collection: 'sessions'
});

// store the session cookies in mongodb
app.use(session({
  secret:'my cat',
  resave:false,
  saveUninitialized:true,
  store:sessionStore,
  cookie:{
    maxAge:1000*60*60*24 
  }
}));  

app.get('/', (req, res, next) => {
  res.send("Hello from server at 3000.");
})

const PORT = 3000
app.listen(PORT, () => {
  run().catch(console.dir);
  console.log("Server running at  ", PORT)
})