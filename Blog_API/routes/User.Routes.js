const express = require("express");
const { UserModel } = require("../model/User.Model");
// const bcrypt = require('bcrypt');
const saltRounds = 2;
const jwt = require("jsonwebtoken");


const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    const { name, email, pass, city, age } = req.body;
    try {
        let registered = await UserModel.findOne({ email });
        if (registered) {
            res.status(200).send({ "msg": "user already exists!!" });
        } else {
            const user = new UserModel(req.body);
            await user.save();
            res.status(200).send({ "msg": "New user has been registered" });
            // bcrypt.hash(pass, saltRounds, async function (err, hash) {
            //     if (hash) {
            //         const user = new UserModel(req.body);
            //         await user.save();
            //         res.status(200).send({ "msg": "New user has been registered" });
            //     }else{
            //         res.send({"err": err.message});
            //     }
            // });
        }
    } catch (err) {
        res.status(400).send({ "err": err.message });
    }
});

userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await UserModel.findOne({ email, pass });
        if (user) {
            const token = jwt.sign({ course: "backend" }, "masai");
            res.status(200).send({ "msg": "Login Successfull", "token": token });
        } else {
            res.status(200).send({ "msg": "Wrong Credentials" });
        }
    } catch (err) {
        res.status(400).send({ "err": err.message });
    }
});

module.exports = { userRouter };