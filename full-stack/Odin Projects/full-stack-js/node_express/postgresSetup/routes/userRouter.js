const { Router } = require("express");
const userRouter = Router();
const userController = require("../controller/userController");

userRouter.get("/", userController.userListGet);

userRouter.get("/new", userController.userCreateGet);
userRouter.post("/new", userController.userCreatePost);

userRouter.get("/search", userController.userSearchGet);

userRouter.get("/delete", userController.usersDeleteAllGet);

module.exports = userRouter;
