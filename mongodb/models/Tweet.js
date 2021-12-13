const { model, Schema } = require('mongoose')

const TweetSchema = new Schema({
    username: String,
    body: String,
    media: {
        filename: String,
        mimetype: String,
        encoding: String,
    },
    comments: [
        {
            body: String,
            username: String,
            createdAt: String,
        },
    ],
    likes: [
        {
            username: String,
            createdAt: String,
        },
    ],
    retweetedBy: [
        {
            username: String,
            createdAt: String,
        },
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    createdAt: String,
    updatedAt: String,
})

module.exports = model('Tweet', TweetSchema)