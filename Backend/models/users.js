const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userID: mongoose.Schema.Types.ObjectId,
    name: 'String',
    contact : 'String',
    email: 'String',
    code: 'String',
    logo: 'String',
    phone: 'String',
    password: 'String'
});

const User = mongoose.model("users", UserSchema);
module.exports = User;