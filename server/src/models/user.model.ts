import mongoose, { Document, Schema } from 'mongoose';

interface User extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
    // dob: Date;
    desc: string;
    photo: string;
    following: string[];
    followers: string[];
}

const userSchema = new Schema<User>(
    {
        name: {type: String, required: true},
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        // dob: { type: Date, required: true },
        desc: { type: String },
        photo: { type: String },
        following: [{ type: Schema.Types.ObjectId, ref: 'user' }],
        followers: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    },
    { timestamps: true }
);

const UserModel = mongoose.model<User>('user', userSchema);

export default UserModel;
