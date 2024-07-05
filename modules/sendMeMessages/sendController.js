import express from "express";
import { getMessages, saveMessage } from "./sendService";
import { parseCookieString } from "../../utility/common";
const router = express.Router();

router.post("/nobi", async (req, res) => {
  try {
    console.log("in sendMeMessage /nobi/");
    console.log(req.headers.cookie);
    let cookies = parseCookieString(req.headers.cookie)||"";
    console.log(cookies,"--cookies")
    const result = await saveMessage(req.body, req.headers);
    if (cookies.postal == result.ipObj.postal) {
        result.result.p=true
      }
      if (cookies.domain == result.ipObj.domain) {
        result.result.d=true
      }
      if (cookies.city == result.ipObj.city) {
        result.result.c=true
      }
      if (cookies.route == result.ipObj.route) {
        result.result.r=true
      }
      if (cookies.ip == result.ipObj.ip) {
        result.result.i=true
    }
    for (let key in result.ipObj) {
      res.cookie(key, result.ipObj[key]);
    }
    delete result.ipObj;
    res.status(result.statusCode).send(result);
  } catch (error) {
      console.log(error)
    res.status(error.statusCode).send(error);
  }
});
router.get("/get", async (req, res) => {
  try {
    console.log("in sendMeMessage /get/");
    console.log(req.get("Cookies"));
    const result = await getMessages();
    res.status(result.statusCode).send(result);
  } catch (error) {
    res.status(error.statusCode).send(error);
  }
});

module.exports = router;
