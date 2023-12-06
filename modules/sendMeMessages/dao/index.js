import mongoose from "mongoose";

const messagesDao = {
    saveMessage :async (obj) => {
        try {
            let db = await mongoose.model("messages").create(obj);
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

export default messagesDao