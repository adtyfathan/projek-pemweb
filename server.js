import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import CarRoute from "./routes/CarRoute.js"
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
const port = 3000;

mongoose.connect(uri).then(() => {
    console.log("connect");
    app.listen(port, () => {
        console.log(`di port ${port}`);
    });
}).catch((error) => {
    console.log(error);
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(CarRoute);

