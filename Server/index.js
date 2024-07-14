import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";





const app = express();

// Use cors
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.use(cookieParser());

// URL
app.use("/auth", authRoutes)

app.listen(3000, () => {
    console.log("Server is running...")
})