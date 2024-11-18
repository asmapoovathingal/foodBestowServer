const mongoose = require('mongoose')
const dbConnection = process.env.CONNECTION_STRING

mongoose.connect(dbConnection).then(res=>{
    console.log('Mongodb Atlas connected successfully with fb server');
    
}).catch(err=>{
    console.log("connection failed");
    console.log(err);
    })