import mongoose from 'mongoose'
import dotenv from "dotenv";

dotenv.config();
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    }).catch((err)=>{
        console.log("ERROR While connecting to DB",err.message)
    })
};

export default connectDatabase