import Joi from 'joi';
// import objectId from 'joi-objectid';
const joi = Joi//.extend(objectId);

const validator = (schema:any)=>(payload:any)=>schema.validate(payload, {abortEarly:false});

const signup = joi.object({
    username: joi.string().min(3).required(),
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(6).required(),
    // dob: joi.date().required(),
});

const login = joi.object({
    username: joi.string().min(3),
    email: joi.string().email().lowercase(),
    password: joi.string().min(6).required(),
}).or('username', 'email');

const update = joi.object({
    name: joi.string().min(1),
    desc: joi.string().min(1),
    photo: joi.string().min(1),
});

const connect = joi.object({
    // follower: joi.string().required(),
    // following: joi.string().required()
    id: joi.required(),
});

const tweet = joi.object({
    text: joi.string().min(1).max(300).required(),
});

const edit = joi.object({
    tid: joi.required(),
    text: joi.string().min(1).max(300).required(),
});

const deleteTweet = joi.object({
    tid: joi.required(),
});

const JOI = {
    signup: validator(signup),
    login: validator(login),
    connect: validator(connect),
    update: validator(update),
    tweet: validator(tweet),
    edit: validator(edit),
    deleteTweet: validator(deleteTweet),
}

export default JOI;