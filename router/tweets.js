import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as tweetController from "../Controller/tweet.js";
import { isAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validator.js";

// server validation 하는 이유 ?
// 1. sanitization, normalization 하면서 데이터를 일관성 있게 보관하기 위해서
// 2. db에 접근해서 읽고 쓰기 전에 db가 같은 서버에 있을 수 있지만 다른 클라우드에 있을 때 네크워크 비용이 발생할수 있다. 시간과 비용을 절약하기 위해

const router = express.Router();

const validateTweet = [body("text").trim().isLength({ min: 3 }).withMessage("text 3글자 이상 써주세요."), validate];

// GET / tweets
// GET / tweets?username=:username

router.get("/", isAuth, tweetController.getTweets);
// GET / tweets/:id
router.get("/:id", isAuth, tweetController.getTweet);

// POST / tweets

router.post("/", isAuth, validateTweet, tweetController.createTweet);

// PUT / tweets/:id
router.put("/:id", isAuth, validateTweet, tweetController.updateTweet);

// DELETE / tweets/:id
router.delete("/:id", isAuth, tweetController.deleteTweet);

export default router;
