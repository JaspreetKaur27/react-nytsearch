const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const routes = require("./routes");
const logger = require('morgan');
const PORT = process.env.PORT || 3001;

const db = require('./models');


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

if(process.env.NODE_ENV === "production")
{
    app.use(express.static("client/build"));
}

app.use(routes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "./client/build/index.html"));
});

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/reactnyt";
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactnyt");

mongoose.Promise = Promise;

app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
module.exports = app;