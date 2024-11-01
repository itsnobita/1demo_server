import express from "express";
import { getMessages, saveMessage } from "./addMessageService";
const router = express.Router();


router.post("/set", async (req, res) => {
  try {
    console.log("in addMeMessage /set/");
    const result = await saveMessage(req.body);
    res.status(result.statusCode).send(result);
  } catch (error) {
    res.status(error.statusCode).send(error);
  }
});
router.post("/get", async (req, res) => {
  try {
    console.log("in addMeMessage /get/");
    console.log(`${req.body.name} fetched`)
    const result = await getMessages(req.body.name,req.headers);
    res.status(result.statusCode).send(result);
  } catch (error) {
    res.status(error.statusCode).send(error);
  }
});

module.exports = router;
