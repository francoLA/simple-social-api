import { Schema, model } from "mongoose";

const FollowSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref:"User",
    },
    followed: {
        type: Schema.ObjectId,
        ref:"User"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export default model("Follow", FollowSchema, "follows");;