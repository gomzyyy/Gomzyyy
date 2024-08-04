import express from "express";
import { register, removeUser, loginUser, logout } from "../controllers/userControl.js";

export const registerRouter = express.Router();
registerRouter.route("/register").post(register);


export const deleteUserRouter = express.Router();
deleteUserRouter.route("/delete_user").post(removeUser);

export const loginRouter = express.Router();
loginRouter.route("/login").post(loginUser);

export const logoutRoute = express.Router();
logoutRoute.route("/logout").post(logout);

