import express from "express";
import { saveMessage } from "./sendService";
const router = express.Router();



router.post("/nobi", async (req, res) => {
    try {
        console.log("in sendMeMessage /nobi/" );
        // console.log(req.body)
        const result = await saveMessage(req.body);
        res.status(result.statusCode).send(result)
      } catch (error) {
        res.status(error.statusCode).send(error);
      }
})




module.exports = router;