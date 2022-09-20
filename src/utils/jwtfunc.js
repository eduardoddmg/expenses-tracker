const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/user");

async function authUser(req, res, next) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "Missing data in body request" });
        }

        const bdUser = await userSchema.findOne({ username: username });

        if (!bdUser)
            return res.status(401).json({ message: "Invalid credentials" });

        const check = await bcrypt.compare(password, bdUser.password);

        if (!check)
            return res.status(401).json({ message: "Invalid credentials" });

        req.userId = bdUser._id.toString();
        console.log(bdUser._id);
        next();
    } catch (err) {
        return res.status(500).json({ message: "Unknown error" });
    }
}

function sendJWT(req, res) {
    try {
        const token = jwt.sign({ user: req.user }, process.env.SECRET, {
            expiresIn: 10 * 60 * 60,
        });

        return res
            .status(200)
            .json({ type: "success", message: "usuario logado com sucesso", token: token, username: req.user.username });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

async function verifyJWT(req, res, next) {
    const token = req.headers["x-access-token"];

    if (!token) return res.status(401).json({ message: "No token provided" });

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err)
            return res.status(500).json({ message: "Failed to authenticate", err });
        req.user = decoded.user;
        next();
    });
}

module.exports = { authUser, sendJWT, verifyJWT };
