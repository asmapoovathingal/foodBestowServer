const jwt = require('jsonwebtoken')

// middleware
const jwtMiddleware=(req,res,next)=>{
    console.log("inside the middleware");
    // get token
    const token =req.headers["authorization"].split(" ")[1]
    console.log(token);
    if(token){
    try {
        const jwtResponse = jwt.verify(token,process.env.JWT_PASSWORD)
 console.log(jwtResponse);
 req.userId = jwtResponse.userId
 next()
    } catch {
        res.status(401).json("please login to proceed the step")
    }
    }else{
        res.status(406).json("Authentication failed.....token missing")
    }
}

module.exports = jwtMiddleware
