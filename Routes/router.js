const express = require('express')
const userController = require('../controllers/userController')
const router = new express.Router()
const foodController =require('../controllers/foodController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
// path for register http://localhost:5173/register post request
router.post('/register',userController.registerController)

// path for login http://localhost:5173/login post request
router.post('/login',userController.loginController)

router.post('/add-food',jwtMiddleware,foodController.addFoodController)

router.get('/foods',jwtMiddleware,foodController.allFoodsController)


router.delete('/foods/:fid',foodController.deleteController)

router.post('/auth/google',userController.googleController)


// export router
module.exports = router