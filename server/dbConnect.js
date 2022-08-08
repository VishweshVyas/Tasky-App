import mongoose from "mongoose";

async function dbConnect(){
    try {
        await mongoose.connect(`mongodb+srv://vishwesh:HVbQav05gcg7DdkT@ths.tpa6odc.mongodb.net/Tasky-App`);
        console.log(`Mongo Connected`);
    } catch (error) {
        console.log(error);
    }
}

dbConnect();