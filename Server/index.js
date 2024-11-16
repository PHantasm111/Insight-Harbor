import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import toolRoutes from "./routes/toolRoutes.js";
import questionRoutes from "./routes/questionRoutes.js"
import historyRoutes from "./routes/historyRoutes.js";
import userRoutes from "./routes/userRoutes.js"


const app = express();

const allowedOrigins = [
    'http://localhost:5173',            // Localhost
    'http://frontend:80',              // Docker 内部网络访问（通常用于测试和容器内部请求）
    'http://47.254.181.122:5173'       // 公共 IP，外部访问
];

app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.use(cookieParser());

// Use Routes
app.use("/auth", authRoutes)
app.use("/tool", toolRoutes)
app.use("/question",questionRoutes)
app.use("/history", historyRoutes)
app.use("/user", userRoutes)


app.listen(3000, () => {
    console.log("Server is running...")
})