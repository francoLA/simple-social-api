import { Schema, model } from "mongoose";

const ArticleSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref:"User",
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        default: "default.jpg"
    }
});

export default model("Article", ArticleSchema, "articles");;