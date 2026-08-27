import mongoose from 'mongoose';
import { seedDoctors } from './seedData.js';

let isConnected = false;

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        isConnected = true;
        console.log("🟢 MongoDB Connected Successfully");
    });

    mongoose.connection.on('error', (err) => {
        console.log("⚠️ MongoDB Connection Error:", err.message);
    });

    try {
        await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 3000 });
        await seedDoctors();
    } catch (err) {
        console.log("⚠️ Could not connect to local MongoDB at 127.0.0.1:27017.");
        console.log("💡 Tip: Start local MongoDB service or update MONGODB_URI in backend/.env with your MongoDB Atlas URL.");
    }
};

export { isConnected };
export default connectDB;
