var express = require("express");
var mongoose = require("mongoose");
const path = require('path');
const port = 3030;
const app = express();

app.use(express.static(__dirname));
app.use(express.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://127.0.0.1:27017/database');
var db = mongoose.connection;
db.once('open', () => console.log("Connected to Database"));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phno: String,
});
const Users = mongoose.model("data", userSchema);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post("/post", async (req, res) => {
    const { name, email, phno } = req.body;
    const user = new Users({
        name,
        email,
        phno,
    });

    await user.save();
    console.log(user);
    res.redirect("/"); // Redirect to the index.html page
});

app.listen(port, () => {
    console.log("Listening on port 3030");
});
