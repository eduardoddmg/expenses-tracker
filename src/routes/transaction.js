const userSchema = require("../models/user");
const transactionSchema = require("../models/transaction");

const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../utils/jwtfunc");

router.get("/readTransaction", verifyJWT, async (req, res) => {
    try {
        const idUser = req.user._id;
        const transactions = await transactionSchema.find({ idUser });
        return res.status(200).send({ type: 'success', message: "dados requisitados com sucesso", transactions });
    } catch (error) {
        return res.status(500).send({ type: 'error', message: error });
    }
});

router.post("/createTransaction", verifyJWT, async (req, res) => {
    try {
        const transactionBody = req.body;
        transactionBody.idUser = req.user._id;
        if (!transactionBody.value || !transactionBody.type) {
            return res.status(401).send({ type: "error", message: "dados inválidos" });
        } else {
            const newTransaction = new transactionSchema(transactionBody);
            const transaction = await newTransaction.save();
            return res.status(201).send({ type: "success", message: "transação efetuada com sucesso" })
        }
    } catch (error) {
        return res.status(500).send({ type: "error", message: error });
    }
});

router.put("/updateTransaction", verifyJWT, async (req, res) => {
    try {
        const transactionBody = req.body;
        transactionBody.idUser = req.user._id;
        if (!transactionBody.value || !transactionBody.type) {
            return res.status(401).send({ type: "error", message: "dados inválidos" });
        } else {
            const transaction = await transactionSchema.findByIdAndUpdate(transactionBody._id, transactionBody);
            return res.status(200).send({ type: "success", message: "contato atualizado com sucesso", data: transaction });
        }
    } catch (error) {
        return res.status(500).send({ type: "error", message: error })
    }
});

router.delete("/deleteTransaction", verifyJWT, async (req, res) => {
    try {
        const { idTransaction } = req.query;
        if (idTransaction) {
            const transaction = await transactionSchema.findByIdAndRemove(idTransaction);
            return res.status(200).send({ type: "success", message: "contato apagado com sucesso"});
        } else {
            return res.status(401).send({ type: "error", message: "dados inválidos" });
        }
    } catch (error) {
        return res.stauts(500).send({ type: "error", message: error });
    }
});

module.exports = router;
