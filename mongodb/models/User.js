const { model, Schema } = require('mongoose')

const UserSchema = new Schema({
    name: String,
    username: String,
    dob: Date,
    email: String,
    password: String,
    createdAt: Date,
    updatedAt: Date,
})

module.exports = model('User', UserSchema)