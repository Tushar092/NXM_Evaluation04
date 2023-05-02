const express = require("express");
const connection = require("./db");
const { userRouter } = require("./routes/User.Routes");
const { auth } = require("./middlewares/auth.middleware");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const { articleRouter } = require("./routes/Article.Routes");

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/articles", articleRouter);

app.get("/", (req, res) => {
    res.send("HOME PAGE");
});
app.get("/contacts", (req, res) => {
    res.send("CONTACTS PAGE");
});
app.get("/about", (req, res) => {
    res.send("ABOUT PAGE");
});

app.use(auth);

app.get("/Articles", (req, res) => {
    res.status(200).send("Articles");
});
app.get("/series", (req, res) => {
    const {token} = req.query;
    jwt.verify(token, 'masai', function(err, decoded) {
        if(decoded){
            res.status(200).send("Series Data");
        }else{
            res.status(400).send({"err":err.message});
        }
      });
});


app.listen(`${process.env.port}`, async (req, res) => {
    try {
        await connection;
        console.log(`Connected to the ${process.env.port}`);
    } catch (err) {
        console.log("Cannot connect to the DB");
        console.log(err);
    }
});