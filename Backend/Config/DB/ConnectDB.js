import mongoose from 'mongoose';

const connectDB = async (url) => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(url);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Database Connection Error:', err);
    }
};

export default connectDB;
