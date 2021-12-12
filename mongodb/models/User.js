const { model, Schema } = require('mongoose')

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String,
    updatedAt: String,
})

module.exports = model('User', UserSchema)