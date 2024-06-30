import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const DBURI = process.env.DBURI.replace(
            "<password>",
            process.env.DBPASSWORD
        );
        const connectionInstance = await mongoose.connect(
            `${DBURI}/${DB_NAME}`
        );
        console.log(
            `\nMONGODB connected!! DB HOST: ${connectionInstance.connection.host} \n`
        );
    } catch (error) {
        console.log("MONGODB connection Failed", error);
        process.exit(1);
    }
};

export default connectDB;
