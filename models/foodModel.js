const mongoose = require('mongoose')
   

const foodSchema =new mongoose.Schema({
    meals:{
        type:String,
    },
    place:{
        type:String,
    },
    date:{
        type:String,
    },
    time:{
        type:String,
        unique:true

    }
})
const foods = mongoose.model("foods",foodSchema)
module.exports = foods