const mongoose = require('mongoose');
const dotenv = require("dotenv");
var secret = "hithisisaloginsignupusingpasssport";
var conn = "mongodb://localhost:27017/userdetails";

const connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String
});
const User = connection.model('User', UserSchema);

module.exports = connection;