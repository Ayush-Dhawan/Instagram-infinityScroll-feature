import express from "express";
import getReelsInRange from "../controllers/reelControllers/getReelsInRange.controller.js";
import insertAllReels from "../controllers/reelControllers/insertAllVideos.controllers.js";
import increaseReelLikes from "../controllers/reelControllers/increateLikes.contoller.js";

const router = express.Router();

router.get("/:start/:end", getReelsInRange);
// router.post("/:reelId/:liked", increaseReelLikes);
router.post("/", increaseReelLikes)

export default router