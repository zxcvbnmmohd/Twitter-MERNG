const { model, Schema } = require('mongoose')

const PostSchema = new Schema({
    username: String,
    body: String,
    media: {
        data: Buffer,
        contentType: String,
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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    createdAt: String,
    updatedAt: String,
})

module.exports = model('Post', PostSchema)