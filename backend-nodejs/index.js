import express from "express";
import dotenv from "dotenv"
import connectDB from "./databases/database.js";
import {registerRouter, RemoveUserRouter} from "./routes/Route.js"


dotenv.config({});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/user", registerRouter);
app.use("/api/v1/user", RemoveUserRouter);

app.listen(PORT, ()=>{
    connectDB();
    console.log(`server listening at port no. "${PORT}"`)
})

