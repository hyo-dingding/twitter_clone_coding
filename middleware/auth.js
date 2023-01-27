import jwt from "jsonwebtoken";
import * as userRepository from "../data/auth.js";

export const isAuth = async (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!(authHeader && authHeader.startsWith)) {
    }
};
