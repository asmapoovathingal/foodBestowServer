const users = require("../models/userModel");
const jwt = require('jsonwebtoken')
// register logic
exports.registerController=async(req,res)=>{
    console.log("inside register controller");
    console.log(req);
    // res.status(200).json("Register request recieved")
    const {username,email,password} =req.body
    console.log(username,email,password);
    // check email is present in mongodb
    try {
        const existingUser = await users.findOne({email})
        console.log(existingUser);
        // already user
        if(existingUser){
            // const token=jwt.sign({userid:existingUser._id},process.env.JWT_PASSWORD)
            res.status(406).json("Account already exist.... please login")

        }else{
            // new user
            const newUser = new users({
                username,email,password
            })
            await newUser.save()
            res.status(200).json(newUser)

        }
    } catch (err) {
        res.status(401).json(err)
    }
    
    
}
// login logic
exports.loginController=async(req,res)=>{
    console.log("inside loginController");
 const   {email,password}=req.body
 console.log(email,password);
//  check email in mongodb
 try {
    const existingUser =await users.findOne({email,password})
    if(existingUser){
        // allow login
// generate token using jwt
const token = jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)

console.log(token);

        res.status(200).json({
            user:existingUser,
            token
        })
    }else{
        console.log("Invalid email/password");
        
    }
 } catch (err) {
    res.status(404).json(err)
 }
    
}
exports.googleController = async (req, res) => {
    const { idToken } = req.body;
    try {
      // Verify the ID token
      const decodedToken = await admin.auth().verifyIdToken(idToken);
  
      // The user's Firebase UID
      const uid = decodedToken.uid;
      const email = decodedToken.email;
  
      // Check if the user exists in your database or create a new user
      // Assuming you have a User model in a database
      const user = await findOrCreateUser({ uid, email });
  
      // Send back the user and a custom JWT (if needed)
      res.status(200).json({ user, message: "Authenticated successfully" });
    } catch (error) {
      console.error('Error verifying ID token:', error);
      res.status(401).json({ error: 'Unauthorized' });
    }
  };