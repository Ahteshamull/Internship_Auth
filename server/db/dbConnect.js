import mongoose from "mongoose";

export const dbConnectDb = async () => {
    try {
        await mongoose.connect(process.env.db).then(() => console.log("Database connected"));   

    } catch (error) {
        console.log(error);
    }
}
