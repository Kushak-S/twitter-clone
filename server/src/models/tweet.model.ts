import mongoose, { Document, Schema } from 'mongoose';

interface Tweet extends Document {
    uid: Schema.Types.ObjectId;
    text: string;
    media: string[];
}

const tweetSchema = new Schema<Tweet>(
    {
        uid: { type: Schema.Types.ObjectId, ref: 'tweet', required: true },
        text: { type: String, required: true },
        media: [{ type: String }],
    },
    { timestamps: true }
);

const TweetModel = mongoose.model<Tweet>('tweet', tweetSchema);

export default TweetModel;
