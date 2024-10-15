import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        name: {
           type:String
        },
        message: {
            type: String
        },
        
    },
    { timestamps: true }
);

export default model("my_message", userSchema, "my_message");

