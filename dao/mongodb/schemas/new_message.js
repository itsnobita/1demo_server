import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        atob: {
           type:String
        },
        btoa: {
          type:String  
        },
        messages: {
            type: [
                {}
            ]
        },
        
    },
    { timestamps: true }
);

export default model("new_message", userSchema, "new_message");

