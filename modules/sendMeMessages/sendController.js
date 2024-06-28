import express from "express";
import { getMessages, saveMessage } from "./sendService";
const router = express.Router();



router.post("/nobi", async (req, res) => {
    try {
        console.log("in sendMeMessage /nobi/");
        // console.log(req.body)
        const result = await saveMessage(req.body, req.headers);
        res.status(result.statusCode).send(result)
    } catch (error) {
        res.status(error.statusCode).send(error);
    }
})
router.get("/get", async (req, res) => {
    try {
        console.log("in sendMeMessage /get/");
        console.log(req.get('Cookies'))
        const result = await getMessages();
        res.status(result.statusCode).send(result)
    } catch (error) {
        res.status(error.statusCode).send(error);
    }
})




module.exports = router;