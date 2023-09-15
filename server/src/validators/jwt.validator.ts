import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const jwt_secret_key = process.env.JWT_SECRET_KEY || '';

const JWT = {
    sign_jwt: (payload:any)=>{
        return jwt.sign(payload, jwt_secret_key, {expiresIn: '3d'});
    },

    verify_user: (req:Request, res:Response, next:NextFunction)=>{
        const auth_token = req.headers.authorization;
        if(!auth_token) return res.status(401).send('Access denied!');
        const token = auth_token.split(' ')[1];
        try{
            jwt.verify(token, jwt_secret_key, (err, payload)=>{
                if(err || !payload || typeof payload !== 'object' || req.params.id !== payload.id)
                    return res.status(401).send('Access Denied!');
                next();
            });
        }catch(err){
            res.status(500).send('something went wrong!');
            console.log(err);
        }
    }
}

export default JWT;