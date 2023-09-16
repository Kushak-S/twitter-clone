import express from 'express';
import userRouter from './routers/user.router.js';
import tweetRouter from './routers/tweet.router.js';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3001;
const db_config = process.env.DB_CONFIG || '';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.json({status: true, message: "Server running..."});
});

app.use('/user', userRouter);
app.use('/tweet', tweetRouter);

app.use((req, res)=>{
    res.status(404).json({status: false, message: "404 Not Found"});
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});

mongoose.connect(db_config, {dbName: 'twitter'}).then(
    ()=>{console.log("Connected to database")},
).catch((err)=>{
    console.log("Cannot connect to database");
    console.log(err);
});
