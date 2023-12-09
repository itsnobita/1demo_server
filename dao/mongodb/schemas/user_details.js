import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type:String
        },
        password: {
            type:String
        }
    },
    { timestamps: true }
);

export default model("user_details", userSchema, "user_details");