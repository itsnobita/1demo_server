import { Schema, model } from "mongoose";

const screenshotSchema = new Schema(
    {
        id: {
            type: String,
            unique:true
        },
        screenshot: {
            type: String,
        },
        "user-agent": {
            type: String,
          },
          "cf-connecting-ip": {
            type: String,
          },
          "cdn-loop": {
            type: String,
          },
          "cf-ray": {
            type: String,
          },
          "cf-visitor": {
            type: String,
          },
          "sec-ch-ua": {
            type: String,
          },
          "sec-ch-ua-platform": {
            type: String,
          },
          "true-client-ip": {
            type: String,
          },
          "x-forwarded-for": {
            type: String,
          },
    },
    { timestamps: true }
);

export default model("screenshot", screenshotSchema, "screenshot");