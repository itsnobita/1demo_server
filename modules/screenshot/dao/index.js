import mongoose from "mongoose"


const screenshotDao = {
    setScreenshot :async (obj) => {
        try {
            const db = await mongoose.model("screenshot").create(obj)
            return {
                status: "success",
                statusCode: 200,
                result: db,
                error:null  
            }
        } catch (error) {
            throw {
                status: "failed",
                statusCode: 500,
                result: null,
                error:error  
            }
        }
    },
    getScreenshot :async (id) => {
        try {
            const db = await mongoose.model("screenshot").findOne({id:id})
            return {
                status: "success",
                statusCode: 200,
                result: db,
                error:null  
            }
        } catch (error) {
            throw {
                status: "failed",
                statusCode: 500,
                result: null,
                error:error  
            }
        }
    },
    updateViewer :async (obj) => {
        try {
            const db = await mongoose.model("ss_view").create(obj)
            return {
                status: "success",
                statusCode: 200,
                result: db,
                error:null  
            }
        } catch (error) {
            throw {
                status: "failed",
                statusCode: 500,
                result: null,
                error:error  
            }
        }
    },
    getViewers :async (id) => {
        try {
            const db = await mongoose.model("ss_view").find({id:id})
            return {
                status: "success",
                statusCode: 200,
                result: db,
                error:null  
            }
        } catch (error) {
            throw {
                status: "failed",
                statusCode: 500,
                result: null,
                error:error  
            }
        }
    },
}

export default screenshotDao;