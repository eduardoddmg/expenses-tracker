const userSchema = require("../models/user");
const transactionSchema = require("../models/transaction");

const express = require("express");
const router = express.Router();

const verifyJWT = require('../middlewares/jwt');

const types = ["income", "expense", "invest"];

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
        req.body.idUser = idUser;
        const typeExist = types.find(req.body.type);
        console.log('type', typeExist)
        if (!typeExist) return res.status(404).json({ message: 'esse tipo não existe' });
        console.log('console 1')
        if (req.body.name.length < 5 || req.body.name.length > 15) return res.status(404).json({ message: 'o nome deve ter entre 5 e 15 caracteres' });
        console.log('console 2')
        if (req.body.value < 5 || req.body.value > 100000) return res.status(404).json({ message: 'o valor deve estar entre 5 e 100.000' });
        console.log('console 3')
        const transaction = await transactionSchema.create(req.body);
        console.log('console 4')
        return res.status(201).json({ message: 'transação adicionada!' });        
    } catch (err) {
        return res.status(500).json({ message: err })
    }
});

router.patch("/updateTransaction:id", async (req, res) => {
    try {
        const { id: idTransaction } = req.params;
        if (!typeExist) return res.status(404).json({ message: 'esse tipo não existe' });
        if (req.body.name.length < 5 || req.body.name.length > 15) return res.status(404).json({ message: 'o nome deve ter entre 5 e 15 caracteres' });
        if (req.body.value < 5 || req.body.value > 100000) return res.status(404).json({ message: 'o valor deve estar entre 5 e 100.000' });
        const transaction = await transactionSchema.findOneAndUpdate({ _id: idTransaction }, req.body);
        return res.status(200).json({ message: "transação editada!" });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
});

router.delete("/deleteTransaction:id", async (req, res) => {
    try {
        const { id: idTransaction } = req.params;
        const transaction = await transactionSchema.findOneAndDelete({ _id: idTransaction });
        return res.status(200).json({ message: "transação deletada!" });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
});


module.exports = router;
