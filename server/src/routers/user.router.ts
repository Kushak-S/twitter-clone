import { Router } from "express";
import cryptojs from "crypto-js";
import dotenv from 'dotenv';
import jwt from "../validators/jwt.validator.js"
import joi from "../validators/req.validator.js"
import User from "../models/user.model.js"

dotenv.config();
const pass_secret_key = process.env.PASS_SECRET_KEY || '';

const userRouter = Router();

userRouter.get('/:id', async (req, res)=>{
    const id = req.params.id;
    try{
        const user = User.findById(id);
        if(!user) return res.status(404).send('User not found!');
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({status: false, message: 'something went wrong!'});
    }
});

userRouter.post('/signup', async (req, res)=>{
    const {error, value} = joi.signup(req.body);
        if(error) return res.status(400).send(error.details);
        const user = await User.findOne({email: value.email});
        if(user) return res.status(400).send('Email already exists!');
        const newUser = new User({
            name: value.username,
            username: value.username,
            email: value.email,
            password: cryptojs.AES.encrypt(value.password, pass_secret_key).toString(),
            // dob: value.dob,
        });

        try{
            const savedUser = await newUser.save();
            res.status(200).send(savedUser);
        }catch(err){
            res.status(500).json({status: false, message: 'something went wrong!'});
        }
});

userRouter.post('/login', async (req, res)=>{
    try{
        const {error, value} = joi.login(req.body);
        if(error) return res.status(400).send(error.details);

        const user = (value.username)? await User.findOne({username: value.username}): await User.findOne({email: value.email});
        if(!user) return res.status(404).send('User not found!');
        const hashedPassword = cryptojs.AES.decrypt(user.password, pass_secret_key);
        const user_password = hashedPassword.toString(cryptojs.enc.Utf8);
        if(user_password !== value.password) return res.status(401).send('Wrong password!');
        // const { password, ...verifiedUser} = user._doc;
        const token = 'Bearer ' + jwt.sign_jwt({id: user.id});
        res.status(200).send({user, token});
    }catch(err){
        res.status(500).json({status: false, message: 'something went wrong!'});
    }
});

userRouter.post('/logout/:id', jwt.verify_user, async (req, res)=>{
    res.json({status: true, message: "logged out"});
});

userRouter.put('/update/:id', jwt.verify_user, async (req, res)=>{
    const id = req.params.id;
    const {error, value} = joi.update(req.body);
    if(error) return res.status(400).send(error.details);
    try{
        const userToUpdate = await User.findById(id);

        if (!userToUpdate) {
            return res.status(404).send('User not found!');
        }

        userToUpdate.name = value.name || userToUpdate.name;
        userToUpdate.email = value.email || userToUpdate.email;
        // userToUpdate.dob = value.dob || userToUpdate.dob;
        userToUpdate.desc = value.desc || userToUpdate.desc;
        userToUpdate.photo = value.photo || userToUpdate.photo;

        const updatedUser = await userToUpdate.save();

        res.status(200).json(updatedUser);
    }catch(err){
        console.log(err);
        res.status(500).json({status: false, message: 'something went wrong!'});
    }
});

userRouter.delete('/delete/:id', jwt.verify_user, async (req, res)=>{
    try{
        const {error, value} = joi.login(req.body);
        if(error) return res.status(400).send(error.details);

        const userId = req.params.id;
        const user = (value.username)? await User.findOne({username: value.username}): await User.findOne({email: value.email});
        if(!user) return res.status(400).send('Invalid Token!');
        const email = value.email;
        const savedEmail = user.email;
        const hashedPassword = cryptojs.AES.decrypt(user.password, pass_secret_key);
        const jwtPassword = hashedPassword.toString(cryptojs.enc.Utf8);
        if(email !==savedEmail || jwtPassword !== value.password) return res.status(401).send('Wrong Credentials!');
        const deletedUser = await User.findByIdAndDelete(userId);
        res.status(200).send(deletedUser);
    }catch(err){
        res.status(500).send(err);
    }
});

userRouter.post('/follow/:id', jwt.verify_user, async (req, res)=>{
    const loggedInUserId = req.params.id;
    const { error, value } = joi.connect(req.body);

    if (error) return res.status(400).send(error.details);

    try {
        const userToFollow = await User.findById(value.id);
        const loggedInUser = await User.findById(loggedInUserId);

        if (!userToFollow || !loggedInUser) {
            return res.status(404).send('User not found!');
        }

        if (loggedInUser.following.includes(userToFollow._id.toString())) {
            return res.status(400).send('You are already following this user.');
        }

        loggedInUser.following.push(userToFollow._id);
        userToFollow.followers.push(loggedInUser._id);

        await loggedInUser.save();
        await userToFollow.save();

        res.status(200).send('You are now following the user.');
    } catch (err) {
        res.status(500).json({ status: false, message: 'Something went wrong!' });
    }
});

userRouter.post('/unfollow/:id', jwt.verify_user, async (req, res)=>{
    const loggedInUserId = req.params.id;
    const { error, value } = joi.connect(req.body);

    if (error) return res.status(400).send(error.details);

    try {
        const userToUnfollow = await User.findById(value.id);
        const loggedInUser = await User.findById(loggedInUserId);

        if (!userToUnfollow || !loggedInUser) {
            return res.status(404).send('User not found!');
        }

        if (!loggedInUser.following.includes(userToUnfollow._id.toString())) {
            return res.status(400).send('You are not following this user.');
        }

        loggedInUser.following = loggedInUser.following.filter(
            (userId) => userId.toString() !== userToUnfollow._id.toString()
        );
        userToUnfollow.followers = userToUnfollow.followers.filter(
            (userId) => userId.toString() !== loggedInUser._id.toString()
        );

        await loggedInUser.save();
        await userToUnfollow.save();

        res.status(200).send('You have unfollowed the user.');
    } catch (err) {
        res.status(500).json({ status: false, message: 'Something went wrong!' });
    }
});


export default userRouter;
