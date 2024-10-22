import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        name: {
           type:String
        },
        headers: {
            type: Object
        },
        db: {
            type:Object
        }
        
    },
    { timestamps: true }
);

export default model("my_msg_fetch", userSchema, "my_msg_fetch");

