import { Schema, model } from "mongoose";

const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nick: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "role_user"
    },
    image: {
        type: String,
        default: "default.jpg"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export default model("User", UserSchema, "users");;