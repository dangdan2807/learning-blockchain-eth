var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/scripts", express.static(__dirname + "/node_modules/web3.js-browser/build/"));

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// Mongoose
const mongoose = require("mongoose");
mongoose.connect(
    "mongodb+srv://minigame:minigame@cluster0.j2ei3.mongodb.net/minigame?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err) {
        if (err) {
            console.log("Mongo connection error! " + err);
        } else {
            console.log("Mongo connection successfully!");
        }
    }
);

// minigame minigame
require("./controllers/game")(app);
