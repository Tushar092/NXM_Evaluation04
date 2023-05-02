const express = require("express");
const { ArticleModel } = require("../model/Article.model");

const articleRouter = express.Router();

articleRouter.get("/", (req, res) => {

});

articleRouter.post("/", (req, res) => {

});

articleRouter.put("/", (req, res) => {

});

articleRouter.patch("/", (req, res) => {

});

articleRouter.delete("/", (req, res) => {

});

module.exports = { articleRouter };