import { Schema, model } from "mongoose";

const ssViewSchema = new Schema(
  {
    id: {
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

export default model("ss_view", ssViewSchema, "ss_view");
