import express from 'express';
import { config } from 'dotenv';
import ApplicationRoutes  from './routes.js';
import ErrorMiddleware from './shared/middlewares/errorMiddleware.js';
import cookieParser from 'cookie-parser';
const app = express();
import cors from "cors"

config();

// Impotant Middleware
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET","POST","PUT","DELETE"]
}))

// Application Routes
ApplicationRoutes(app);

export default app; 

app.get("/",(_req,res) => {
    res.send(`<h1>Site Roll is working. click <a href=${process.env.FRONTEND_URL} >here</a> to visit fronted</h1>`)
})

// Add ErrorMiddleware
app.use(ErrorMiddleware);



