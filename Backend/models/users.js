const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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