const userSchema = require("../models/user");

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { authUser, sendJWT, verifyJWT } = require("../utils/jwtfunc");

const saltRounds = 10;

router.post("/register", async (req, res) => {
    try {
        const userData = req.body;

        if (!userData.username || !userData.password || !userData.email) {
            return res.status(401).json({
                type: "error",
                message: "Missing data in body request",
            });
        }

        if (await userSchema.exists({ username: userData.username })) {
            return res.status(401).json({
                type: "error",
                message: "Username already in use",
            });
        }

        if (await userSchema.exists({ email: userData.email })) {
            return res.status(401).json({
                type: "error",
                message: "Email already in use",
            });
        }
        userData.password = await bcrypt.hash(userData.password, saltRounds);
        const newUser = new userSchema(userData);
        const user = await newUser.save();
        return res.status(201).json({
            type: "success",
            message: "User successfully created",
        });
    } catch (error) {
        return res.status(500).json({ type: "error", message: "Unkown error" });
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(401).json({ type: "error", message: "falta dados"});
        const bdUser = await userSchema.findOne({ username });
        req.user = bdUser;
        if (!bdUser) return res.status(401).json({ type: "error", message: "dados inválidos" });
        const check = await bcrypt.compare(password, bdUser.password);
        if (!check) return res.status(401).json({ type: "error", message: "senha inválida" });
        else return next();
    } catch (error) {
        return res.status(500).json({ type: "error", message: error });
    }
}, sendJWT);

router.get("/verifyLogin", verifyJWT, sendJWT);

module.exports = router;
