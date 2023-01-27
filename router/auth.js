import express from "express";
import {} from "express-async-errors";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import * as authController from "../controller/auth.js";

const router = express.Router();

const validateCredential = [
    body("username").trim().notEmpty().withMessage("username should be at least 5 characters"), //
    body("password").trim().isLength({ min: 5 }).withMessage("password should be at least 5 characters"),
    validate,
];

const validateSignup = [
    ...validateCredential,
    body("name").notEmpty().withMessage("name is missing"), //
    body("email").isEmail().normalizeEmail().withMessage("invalid email"),
    // url("url").isURL().withMessage("invalid URL").optional({ nullable: true, checkFalsy: true }),
    // url은 선택사항 -> null 이거나 텅텅 빈 문자열이여도 없는것으로 간주하고 받아줌
    validate,
];

// POST / auth / signup
router.post("/signup", validateSignup, authController.signup);

// POST / auth / login
router.post("/login", validateCredential, authController.login);

// GET / auth / me

export default router;
