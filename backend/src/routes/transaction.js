const userSchema = require("../models/user");
const transactionSchema = require("../models/transaction");

const express = require("express");
const router = express.Router();

const verifyJWT = require('../middlewares/jwt');

router.use(verifyJWT);

router.get("/getAllTransaction", async(req, res) => {
    try {
        const { id: idUser } = req.user;
        if (!idUser) return res.status(404).json({ message: "id inválido!" });
        const transactions = await transactionSchema.find({ idUser });

        const totalIncome = transactions.filter(item => item.type === "income").reduce((acc, current) => acc+=current.value,0);
        const totalExpense = transactions.filter(item => item.type === "expense").reduce((acc, current) => acc+=current.value,0);
        const totalInvest = transactions.filter(item => item.type === "invest").reduce((acc, current) => acc+=current.value,0);
        res.status(200).json({ message: 'dados requisitados com sucesso!', transactions, total: { totalIncome, totalExpense, totalInvest }});
    } catch (err) {
        return res.status(500).json({ message: err });
    }
});

router.post("/createTransaction", async (req, res) => {
    try {
        const { id: idUser } = req.user;
        console.log(idUser);
        req.body.idUser = idUser;
        const transaction = await transactionSchema.create(req.body);
        return res.status(201).json({ message: 'transação adicionada!' });        
    } catch (err) {
        return res.status(500).json({ message: err })
    }
});

router.patch("/updateTransaction:id", async (req, res) => {
    try {
        const { id: idTransaction } = req.params;
        const transaction = await transactionSchema.findOneAndUpdate({ _id: idTransaction }, req.body);
        return res.status(200).json({ message: "transação editada!" });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
});

router.delete("/deleteTransaction:id", async (req, res) => {
    try {
        const { id: idTransaction } = req.params;
        console.log(idTransaction);
        const transaction = await transactionSchema.findOneAndDelete({ _id: idTransaction });
        return res.status(200).json({ message: "transação deletada!" });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
});


module.exports = router;
