import { Router } from "express";
import jwt from "../validators/jwt.validator.js"
import joi from "../validators/req.validator.js"
import Tweet from "../models/tweet.model.js"
import User from "../models/user.model.js"

const tweetRouter = Router();

tweetRouter.get('/user/:id', jwt.verify_user, async (req, res)=>{
    const uid = req.params.id;
    const page = parseInt(req.query.page as string) || 1;
    try{
        const tweets = await Tweet.find({uid}).sort({createdAt: -1}).skip(10*(page-1)).limit(10);
        res.status(200).json(tweets);
    }catch(err){
        res.status(500).json({status: false, message: 'something went wrong!'});
    }
});

tweetRouter.get('/timeline/:id', jwt.verify_user, async (req, res)=>{
    const uid = req.params.id;
    const page = parseInt(req.query.page as string) || 1;
    try{
        
        const user = await User.findById(uid);
        if(!user) return res.status(404).send('User not found!');
        const following = user.following;

        const tweets = await Tweet.find({uid: {$in: following}}).sort({createdAt: -1}).skip(10*(page-1)).limit(10);
        res.status(200).json(tweets);
    }catch(err){
        res.status(500).json({status: false, message: 'something went wrong!'});
    }
});

tweetRouter.post('/create/:id', jwt.verify_user, async (req, res)=>{
    const {error, value} = joi.tweet(req.body);
    if(error) return res.status(400).json(error.details);
    const uid = req.params.id;
    const text = value.text;
    const newTweet = new Tweet({
        uid,
        text,
    });
    try{
        const savedTweet = await newTweet.save();
        res.status(200).json(savedTweet);
    }catch(err){
        res.status(500).json({status: false, message: 'something went wrong!'});
    }
});

tweetRouter.put('/edit/:id', jwt.verify_user, async (req, res)=>{
    const { error, value } = joi.edit(req.body);
    if (error) return res.status(400).send(error.details);

    const tid = value.tid;
    const text = value.text;

    try {
        const tweet = await Tweet.findById(tid);
        if (!tweet) return res.status(404).send('Tweet not found!');

        tweet.text = text;
        const updatedTweet = await tweet.save();

        res.status(200).json(updatedTweet);
    } catch (err) {
        res.status(500).json({ status: false, message: 'Something went wrong!' });
    }
});

tweetRouter.delete('/delete/:id', jwt.verify_user, async (req, res)=>{
    const {error, value} = joi.deleteTweet(req.body);
    if(error) return res.status(400).send(error.details);
    const id = value.tid;
    try{
        const deletedTweet = await Tweet.findByIdAndDelete(id);
        res.status(200).send(deletedTweet);
    }catch(err){
        res.status(500).json({status: false, message: 'something went wrong!'});
    }
});

export default tweetRouter;