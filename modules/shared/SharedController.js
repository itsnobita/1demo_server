import express from "express";
import log from "../../utility/logger";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

/**
 * @description This REST endpoint provide functionality to get projects
 * @param {string} req.headers.auth_user
 */
router.get("/refresh-session", async (req, res) => {
    res.status(200).send({
        result: { "message": "Session Refreshed" }
    });
});

module.exports = router;
