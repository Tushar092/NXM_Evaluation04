const express = require("express");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try {
            const decoded = jwt.verify(token.split(" ")[1], 'masai');
            if(decoded){
                next();
            }else{
                res.status(200).send({"msg": "Something went wrong"});
            }
        } catch (err) {
            res.status(400).send({"msg": err.message});
        }
    }else{
        res.status(200).send({"msg": "Please Login!!!"});
    }
}

module.exports = { auth };