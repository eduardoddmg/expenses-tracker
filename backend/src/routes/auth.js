const userSchema = require("../models/user");

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const verifyJWT = require("../middlewares/jwt");

const saltRounds = 10;

const authRequisitos = {
    length: {
        min: {
            username: 5,
            password: 8
        },
        max: {
            username: 15,
            password: 15
        }
    }
};

const sendJWT = async(req, res) => {
    try {
        const user = req.user;
        const token = jwt.sign({ username: user.username, id: user.id }, 'STRING SECRETA', {
            expiresIn: '1d'
        });
        return res.status(200).json({ message: 'usuario logado', token, username: user.username });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

router.post("/register", async (req, res, next) => {
    try {
        if (!req.body.username || !req.body.password) return res.status(401).json({ message: "Dados incompletos" });
        else {
            // verificar tamanho das strings
            if (req.body.username.length < authRequisitos.length.min.username) return res.status(401).json({ message: "Username precisa ter no minimo 8 caracteres" });
            if (req.body.username.length > authRequisitos.length.max.username) return res.status(401).json({ message: "Username precisa ter no maximo 15 caracteres" });
            if (req.body.password.length < authRequisitos.length.min.password) return res.status(401).json({ message: "A senha precisa ter no minimo 8 caracteres" });
            if (req.body.password.length > authRequisitos.length.max.password) return res.status(401).json({ message: "A senha precisa ter no maximo 15 caracteres" });

            // verificar se input tem espaço
            if (req.body.username.indexOf(" ") >= 0) return res.status(401).json({ message: "Username não pode conter espaço" });
            if (req.body.password.indexOf(" ") >= 0) return res.status(401).json({ message: "Senha não pode conter espaço" });
            
            // verificar se user ja existe
            if (await userSchema.exists({ username: req.body.username })) return res.status(401).json({ message: "Usuário já existe" });
            
            // criar conta
            req.body.password = await bcrypt.hash(req.body.password, saltRounds);
            const newUser = new userSchema(req.body);
            const user = await newUser.save();
            return res.status(201).json({ message: "Usuário criado com sucesso!" });
        }
    } catch (err) {
        return res.status(500).json({ message: err })
    }
});

router.post("/login", async (req, res, next) => {
    try {
        console.log(req.body);
        if (!req.body.username || !req.body.password) return res.status(401).json({ message: "Dados incompletos" });
        else {
            // verificar tamanho das strings
            if (req.body.username.length < authRequisitos.length.min.username) return res.status(401).json({ message: "Username precisa ter no minimo 8 caracteres" });
            if (req.body.username.length > authRequisitos.length.max.username) return res.status(401).json({ message: "Username precisa ter no maximo 15 caracteres" });
            if (req.body.password.length < authRequisitos.length.min.password) return res.status(401).json({ message: "A senha precisa ter no minimo 8 caracteres" });
            if (req.body.password.length > authRequisitos.length.max.password) return res.status(401).json({ message: "A senha precisa ter no maximo 15 caracteres" });
            
            // verificar se input tem espaço
            if (req.body.username.indexOf(" ") >= 0) return res.status(401).json({ message: "Username não pode conter espaço" });
            if (req.body.password.indexOf(" ") >= 0) return res.status(401).json({ message: "Senha não pode conter espaço" });
            
            // verificar se user ja existe
            if (!await userSchema.exists({ username: req.body.username })) return res.status(401).json({ message: "Usuário não existe" });
            else {
                const userDb = await userSchema.findOne({username: req.body.username});
                console.log(userDb);
                req.user = { username: userDb.username, id: userDb._id.toString()}
                // verificar senha
                const result = await bcrypt.compare(req.body.password, userDb.password);
                if (!result) return res.status(401).json({ message: "senha inválida" });
                else next();
            }
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err });
    }
}, sendJWT);

router.post("/verifyLogin", verifyJWT, sendJWT);

module.exports = router;
