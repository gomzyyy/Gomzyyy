import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import connectDB from "./databases/database.js";
import {registerRouter, deleteUserRouter, loginRouter, logoutRoute} from "./routes/Route.js"
dotenv.config({});

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin:"http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials:true
}

app.use(express.json());
app.use(cookieParser())

app.use("/api/v1/user", registerRouter);
app.use("/api/v1/user", deleteUserRouter);
app.use("/api/v1/user", loginRouter);
app.use("/api/v1/user", logoutRoute)

app.listen(PORT, ()=>{
    connectDB();
    console.log(`server listening at port no. "${PORT}"`)
})

