const foods = require('../models/foodModel')


// add food
exports.addFoodController =async(req,res)=>{
    console.log('inside add food controller');
    // console.log(req.body);
//  const   f_id =req.params
    const {meals,place,date,time}=req.body
    // console.log(meals,place,date,time);
    // res.status(200).json("add food request recieved")    
try {

    const existingFood = await foods.findOne({time})
    
    if(existingFood){
        res.status(406).json("this food available in our database.....please add another");
        
    }else{
        const newFoods =new foods({
            meals,place,date,time
        })
        await newFoods.save()

        res.status(200).json("Food added succesfully")
        console.log(newFoods);

        
        
    }
} catch (error) {
    res.status(404).error
}
    
    
}


// get all foods
exports.allFoodsController =async(req,res)=>{
    console.log("inside allfood controller");
    
    // res.status(200).json("insideAllfood controller")
    console.log(req.body);
    
    try {
        const allFoods = await foods.find()
        res.status(200).json(allFoods)
        console.log(allFoods);
        
    } catch (error) {
        res.status(401).json(error)
    }
    
}


exports.deleteController =async(req,res)=>{
    // res.status(200).json(req.params);
    
    const fid =req.params.fid
    // res.status(200).json(fid);

    try {
        const deleteFood = await foods.deleteOne({_id:fid})
        if(deleteFood){
            res.status(200).json("delete food successfully")

        
    }else{
        res.status(401).json(error)
    }
    } catch (error) {
    res.status(500).json(error)
}
}