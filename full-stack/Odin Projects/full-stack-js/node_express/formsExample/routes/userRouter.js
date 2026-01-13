 const { Router } = require("express");
 const usersController = require('../controllers/userController.js')
 const userRouter = Router();
 
 userRouter.get("/", usersController.usersListGet);
 userRouter.get("/create", usersController.usersCreateGet)
 userRouter.post("/create", usersController.usersCreatePost)
 
 module.exports = userRouter;