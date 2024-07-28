import express from "express";
import { register, removeUser } from "../controllers/userControl.js";

export const registerRouter = express.Router();
registerRouter.route("/register").post(register);


export const RemoveUserRouter = express.Router();

RemoveUserRouter.route("/remove_user").post(removeUser);
