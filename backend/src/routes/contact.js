const userSchema = require("../models/user");
const contactSchema = require("../models/contact");

const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../utils/jwtfunc");

router.get("/readContact", verifyJWT, async (req, res) => {
    try {
        const idUser = req.user._id;
        const contacts = await contactSchema.find({ idUser });
        return res.status(200).send({ type: 'success', message: "dados requisitados com sucesso", contacts });
    } catch (error) {
        return res.status(500).send({ type: 'error', message: error });
    }
});

router.post("/createContact", verifyJWT, async (req, res) => {
    try {
        const contactBody = req.body;
        contactBody.idUser = req.user._id;
        if (!contactBody.name || !contactBody.phoneNumber || !contactBody.email) {
            return res.status(401).send({ type: "error", message: "dados inválidos" });
        } else {
            const newContact = new contactSchema(contactBody);
            const contact = await newContact.save();
            return res.status(201).send({ type: "success", message: "contato criado com sucesso" })
        }
    } catch (error) {
        return res.status(500).send({ type: "error", message: error });
    }
});

router.put("/updateContact", verifyJWT, async (req, res) => {
    try {
        const contactBody = req.body;
        contactBody.idUser = req.user._id;
        if (!contactBody.name || !contactBody.phoneNumber || !contactBody.email) {
            return res.status(401).send({ type: "error", message: "dados inválidos" });
        } else {
            const contact = await contactSchema.findByIdAndUpdate(contactBody._id, contactBody);
            return res.status(200).send({ type: "success", message: "contato atualizado com sucesso", data: contact });
        }
    } catch (error) {
        return res.status(500).send({ type: "error", message: error })
    }
});

router.delete("/deleteContact", verifyJWT, async (req, res) => {
    try {
        const { idContact } = req.query;
        if (idContact) {
            const contact = await contactSchema.findByIdAndRemove(idContact);
            return res.status(200).send({ type: "success", message: "contato apagado com sucesso"});
        } else {
            return res.status(401).send({ type: "error", message: "dados inválidos" });
        }
    } catch (error) {
        return res.stauts(500).send({ type: "error", message: error });
    }
});

module.exports = router;
