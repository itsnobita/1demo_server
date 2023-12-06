import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        message: {
            type:String
        },
        deviceDetails: {
            type:Object
        }
        
    },
    { timestamps: true }
);

export default model("messages", userSchema, "messages");