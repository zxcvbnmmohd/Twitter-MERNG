const { AuthenticationError, UserInputError } = require("apollo-server-express")
const { PubSub } = require("graphql-subscriptions")
const Post = require("../../models/Post")
const checkAuth = require("../../utils/check-auth")

const pubsub = new PubSub();

module.exports = {
    Query: {
        getPosts: async () => {
            try {
                const posts = await Post.find()
                return posts
            } catch (e) {
                throw new Error(e)
            }
        },
        getPost: async (_, { postID }) => {
            try {
                const post = await Post.findById(postID).sort({ createdAt: -1 })

                if (post) {
                    return post
                } else {
                    throw new Error("Post not found...")
                }
            } catch (e) {
                throw new Error(e)
            }
        },
    },

    Mutation: {
        createPost: async (_, { body }, context) => {
            const user = checkAuth(context)
            console.log(user)
            
            if (body.trim() === '') {
                throw new Error("Can't post empty content :(")
            }

            const newPost = new Post({
                user: user.id,
                body,
                username: user.username,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            })

            pubsub.publish('NEW_POST', { newPost })
            return await newPost.save()
        },
        deletePost: async (_, { postID }, context) => {
            const user = checkAuth(context)
            console.log(user)

            try {
                const post = await Post.findById(postID)

                if (user.username === post.username) {
                    await post.delete()
                    return "Succes: Post Deleted."
                } else {
                    throw new AuthenticationError("Action not allowed")
                }
            } catch (e) {
                throw new Error(e)
            }
        },

        toggleLike: async (_, { postID }, context) => {
            const user = checkAuth(context)
            console.log(user)

            const post = await Post.findById(postID)

            if (post) {
                if (post.likes.find(like => like.username === user.username)) {
                    post.likes = post.likes.filter(like => like.username !== user.username)
                } else {
                    post.likes.push({
                        username: user.username,
                        createdAt: new Date().toISOString(),
                    })
                }

                await post.save()
                return post
            } else {
                throw new UserInputError("Post not found...")
            }
        }
    },

    Subscription: {
        newPost: {
            subscribe: (_, __, ___) => pubsub.asyncIterator(['NEW_POST']),
        }
    },

    Modifiers: {
        likesCount: (parent) => parent.likes.length,
        commentsCount: (parent) => parent.comments.length,
    }
}
