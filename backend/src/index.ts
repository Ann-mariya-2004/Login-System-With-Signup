import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import authRoutes  from './routes/authRoutes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api/auth',authRoutes);
app.get('/', (req, res) => {
  res.send('API is running...');
});
mongoose.connect(process.env.MONGO_URI || '')
 .then(() =>{
    console.log("MongoDB connected");
    app.listen(5000,()=> console.log('Server running on port 5000'));
 })
 .catch(err=> console.log("DB Error",err));