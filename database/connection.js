import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connection = async () => {

    const DB_USER = process.env.DB_USER;
    const DB_PASS = process.env.DB_PASS;

    try {
        await connect(`mongodb://${DB_USER}:${DB_PASS}@localhost:27017/blog?authSource=admin`);

        console.log("Connected to database");
        
    } catch (error) {
        console.log(error);
        throw new Error("Database connection error")
    }
    
}

export default connection;