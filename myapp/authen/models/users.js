var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    name: String,
    telephone: Number,
    isAdmin: {type: Boolean, default: false},
    password: String
},{collection: "users"});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', userSchema);