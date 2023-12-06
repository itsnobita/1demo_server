import express from "express";
import weatherAdapter from "./weatherAdapter";

const router = express.Router();



router.get("/current/:param", async (req, res) => {
  try {
    console.log("in weather /current/" + req.params.param);
    const result = await weatherAdapter.getCurrent(req.params.param);
    res.status(result.statusCode).send(result);
  } catch (error) {
    res.status(error.statusCode).send(error);
  }
  // console.log(req)
});

router.get("/forecastbyday/:param", async (req, res) => {
    try {
      console.log("in weather /forecastbyday/" + req.params.param);
      const result = await weatherAdapter.getForecastByDay(req.params.param);
      res.status(result.statusCode).send(result);
    } catch (error) {
      res.status(error.statusCode).send(error);
    }
    // console.log(req)
  });
router.get("/forecastbyhour/:param", async (req, res) => {
    try {
      console.log("in weather /forecastbyhour/" + req.params.param);
      const result = await weatherAdapter.getForecastByHour(req.params.param);
      res.status(result.statusCode).send(result);
    } catch (error) {
      res.status(error.statusCode).send(error);
    }
    // console.log(req)
  });
router.get("/search/:param", async (req, res) => {
    try {
      console.log("in weather /search/" + req.params.param);
      const result = await weatherAdapter.getSearch(req.params.param);
      res.status(result.statusCode).send(result);
    } catch (error) {
      res.status(error.statusCode).send(error);
    }
    // console.log(req)
  });

router.get("*", (req, res) => {
    res.status(401).send("forbidden");
  });

module.exports = router;
