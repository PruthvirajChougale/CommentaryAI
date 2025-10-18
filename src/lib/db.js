import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MongoUri = process.env.MONGO_URL;

let isConnected = false;

const ConnectToDB =async () =>{
    if(isConnected) return mongoose.connection;
    try{
        console.log(MongoUri);
        const db = await mongoose.connect(MongoUri);
        console.log("Connected to MongoDB successfully");
        isConnected = db.connections[0].readyState === 1;
        return db;
    }
    catch(error){
        console.log(error);
    }
}

export default ConnectToDB;