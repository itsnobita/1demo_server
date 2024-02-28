import express from "express";
import screenshotService from "./screenshotService";
const router = express.Router();



router.post("/set", async (req, res) => {
    try {
        console.log("in screenshot /set");
        // console.log(req.body)
        const result = await screenshotService.setScreenshot({ ...req.headers, ...req.body });
        res.status(result.statusCode).send(result)
    } catch (error) {
        res.status(error.statusCode).send(error);
    }
})
router.get("/get/:param", async (req, res) => {
    try {
        console.log("in screenshot /get/");
        // console.log(req.body)
        const result = await screenshotService.getScreenshot(req.params.param, req.headers);
        res.status(result.statusCode).send(result)
    } catch (error) {
        res.status(error.statusCode).send(error);
    }
})

router.get("/getall", async (req, res) => {
    try {
        console.log("in screenshot /get/");
        // console.log(req.body)
        const result = await screenshotService.getScreenshotAll();
        res.status(result.statusCode).send(result)
    } catch (error) {
        res.status(error.statusCode).send(error);
    }
})

router.get("/getviewers/:param", async (req, res) => {
    try {
        console.log("in screenshot /getViewers/");
        // console.log(req.body)
        const result = await screenshotService.getViewers(req.params.param);
        res.status(result.statusCode).send(result)
    } catch (error) {
        res.status(error.statusCode).send(error);
    }
})




module.exports = router;