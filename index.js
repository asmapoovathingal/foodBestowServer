const dotenv = require('dotenv').config()
const express = require('express')
const admin = require('firebase-admin')
const cors = require('cors')
const router = require('./Routes/router')
require('./dbConnections/connection')
// create server using express
const fbServer = express()
// data sharing between client and server
fbServer.use(cors())

// parse json data to javascript
fbServer.use(express.json())

fbServer.use(router)
// create port for run sever
const PORT = 3000 || process.env.PORT

// run server app
fbServer.listen(PORT,()=>{
    console.log(`fbserver started at ${PORT} and waiting for client request`);
    
})



// resolving server request
fbServer.get(`/`,(req,res)=>{
  res.status(200).send(`fbserver started at ${PORT} and waiting for client request`)
   
})