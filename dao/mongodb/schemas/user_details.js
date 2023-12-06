import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type:String
        },
        value: {
            type:Number
        }
    }
    // { timestamps: true }
);

export default model("user_details", userSchema, "user_details");