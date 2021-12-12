const { AuthenticationError, UserInputError } = require("apollo-server-express")
const Post = require("../../models/Post")
const checkAuth = require("../../utils/check-auth")

module.exports = {
    Mutation: {
        createComment: async (_, { postID, body }, context) => {
            const user = checkAuth(context)
            console.log(user)

            if (body.trim() === "") {
                throw new UserInputError("Empty Comment", {
                    errors: {
                        body: "Comment cannot be empty...",
                    },
                })
            }

            const post = await Post.findById(postID)

            if (post) {
                post.comments.unshift({
                    body,
                    username: user.username,
                    createdAt: new Date().toISOString(),
                })

                await post.save()
                return post
            } else {
                throw new UserInputError("Post not found...")
            }
        },
        deleteComment: async (_, { postID, commentID }, context) => {
            const user = checkAuth(context)
            console.log(user)

            const post = await Post.findById(postID)

            if (post) {
                const commentIndex = post.comments.findIndex(
                    (comment) => comment.id === commentID
                )
                if (commentIndex >= 0) {
                    if (post.comments[commentIndex].username === user.username) {
                        post.comments.splice(commentIndex, 1)
                        await post.save()
                        return post
                    } else {
                        throw new AuthenticationError("This ain't your post man...")
                    }
                } else {
                    throw new UserInputError("Comment not found...")
                }
            } else {
                throw new UserInputError("Post not found...")
            }
        },
    },
}
