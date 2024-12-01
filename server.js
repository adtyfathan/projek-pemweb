import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import CarRoute from "./routes/CarRoute.js"
import NewsRoute from "./routes/NewsRoute.js"
import UserRoute from "./routes/UserRoute.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(NewsRoute);
app.use(CarRoute);
app.use(UserRoute);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
})

app.get("/model", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "model.html"));
})

app.get("/news", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "news.html"))
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "contact.html"))
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/sign-up", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "sign-up.html"));
});

app.get("/account", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "account.html"));
});

app.get("/cars/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "model-child.html"));
})

app.get("/news/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "news-child.html"));
})

app.get("/checkout/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "checkout.html"));
})

app.get("/payment/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "payment.html"));
})

app.get("/payment-complete/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "payment-complete.html"));
})

app.get("/profile-data", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "profile-data.html"));
})

app.get("/profile-transaction", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "profile-transaction.html"));
})

app.get("/profile-account", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "profile-account.html"));
})

app.get("/profile-contact", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "profile-contact.html"));
})

app.get("/profile-transaction-child/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "profile-transaction-child.html"));
})

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected to mongodb");
        app.listen(port, () => {
            console.log(`running in ${port}`);
        });
    }).catch((error) => {
        console.log(error);
    });
