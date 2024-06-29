import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String
        },
        password: {
            type: String
        },
        deviceDetails: {
            type: Object
        }
    },
    { timestamps: true }
);

export default model("user_details", userSchema, "user_details");