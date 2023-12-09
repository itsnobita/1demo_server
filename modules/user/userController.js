import express from "express";
import mongoose from "mongoose";

const router = express.Router();



router.post("/login", async(req, res) => {
    
    let db = await mongoose.model("user_details").create(req.body)
    res.send(db)
});






module.exports = router;