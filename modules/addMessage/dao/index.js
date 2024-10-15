import mongoose from "mongoose";
import messages from "../../../dao/mongodb/schemas/messages";

const addMessageDao = {
    saveMessage: async (obj) => {
        try {
            let db = await mongoose.model("my_message").create(obj);
            return {
                status: "success",
                statusCode: 200,
                result: { message:"success"},
                error: null
            }
        } catch (error) {
            throw {
                status: "failed",
                statusCode: 500,
                result: null,
                error: error
            }
        }
    },
    getMessages: async (name="") => {
        try {
            let db = await mongoose.model("my_message").aggregate([
                { $match: { name:name } },
                { $group: { _id: "$name", messages: { $push: "$message" } } }
              ])
            return {
                status: "success",
                statusCode: 200,
                result: db,
                error: null
            }
        } catch (error) {
            throw {
                status: "failed",
                statusCode: 500,
                result: null,
                error: error
            }
        }
    }
}

export default addMessageDao