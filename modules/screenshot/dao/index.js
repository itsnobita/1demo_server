import mongoose from "mongoose"


const screenshotDao = {
    setScreenshot: async (obj) => {
        try {
            const screenshot = mongoose.model("screenshot")
            let ss = await screenshot.find({ id: obj.id })
            let db
            if (ss.length > 0) {
                db = await mongoose.model("screenshot").create({ ...obj, id: `${obj.id}--${new Date()}` })
            } else {
                db = await mongoose.model("screenshot").create(obj)

            }
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
    },
    getScreenshotAll: async (id) => {
        try {
            const db = await mongoose.model("screenshot").find({}, { id: 1 })
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
    },
    getScreenshot: async (id) => {
        try {
            const db = await mongoose.model("screenshot").findOne({ id: id })
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
    },
    updateViewer: async (obj) => {
        try {
            const db = await mongoose.model("ss_view").create(obj)
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
    },
    getViewers: async (id) => {
        try {
            const db = await mongoose.model("ss_view").find({ id: id })
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
    },
}

export default screenshotDao;