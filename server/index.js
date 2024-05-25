import express from 'express';
import cors from 'cors'
import connectDatabase from './config/db.js'
import dotenv from "dotenv";
import reelsRouter from './routes/reels.routes.js'


dotenv.config();


const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

app.use("*", (req, res, next) => {
  console.log("method", req.method, "data", req.body, "headers", req.headers);
  next();
});

app.get('/', (req, res)=>{
  res.send(`server is ready on port ${PORT}`);
})

app.use("/api/reels", reelsRouter)





connectDatabase(); 

app.listen(process.env.PORT, () => {
  console.log("Server Started on PORT NO:", process.env.PORT);
});