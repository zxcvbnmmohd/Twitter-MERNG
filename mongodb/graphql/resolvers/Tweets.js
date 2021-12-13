const { AuthenticationError, UserInputError } = require("apollo-server-express")
const { PubSub } = require("graphql-subscriptions")
const Tweet = require("../../models/Tweet")
const checkAuth = require("../../utils/check-auth")

const pubsub = new PubSub();

module.exports = {
    Query: {
        getTweets: async () => {
            try {
                const tweets = await Tweet.find()
                return tweets
            } catch (e) {
                throw new Error(e)
            }
        },
        getTweet: async (_, { tweetID }) => {
            try {
                const tweet = await Tweet.findById(tweetID).sort({ createdAt: -1 })

                if (tweet) {
                    return tweet
                } else {
                    throw new Error("Tweet not found...")
                }
            } catch (e) {
                throw new Error(e)
            }
        },
    },

    Mutation: {
        createTweet: async (_, { body }, context) => {
            const user = checkAuth(context)
            console.log(user)

            if (body.trim() === '') {
                throw new Error("Can't tweet empty content :(")
            }

            const newTweet = new Tweet({
                user: user.id,
                body,
                username: user.username,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            })

            pubsub.publish('NEW_POST', { newTweet })
            return await newTweet.save()
        },
        deleteTweet: async (_, { tweetID }, context) => {
            const user = checkAuth(context)
            console.log(user)

            try {
                const tweet = await Tweet.findById(tweetID)

                if (user.username === tweet.username) {
                    await tweet.delete()
                    return "Succes: Tweet Deleted."
                } else {
                    throw new AuthenticationError("Action not allowed")
                }
            } catch (e) {
                throw new Error(e)
            }
        },

        toggleLike: async (_, { tweetID }, context) => {
            const user = checkAuth(context)
            console.log(user)

            const tweet = await Tweet.findById(tweetID)

            if (tweet) {
                if (tweet.likes.find(like => like.username === user.username)) {
                    tweet.likes = tweet.likes.filter(like => like.username !== user.username)
                } else {
                    tweet.likes.push({
                        username: user.username,
                        createdAt: new Date().toISOString(),
                    })
                }

                await tweet.save()
                return tweet
            } else {
                throw new UserInputError("Tweet not found...")
            }
        },

        uploadMedia: async (_, { file }) => {
            const { createReadStream, filename, mimetype, encoding } = await file;
            const stream = createReadStream();

            // This is purely for demonstration purposes and will overwrite the
            // local-file-output.txt in the current working directory on EACH upload.
            const out = require('fs').createWriteStream('local-file-output.txt');
            stream.pipe(out);
            await finished(out);

            return { filename, mimetype, encoding };
        },
    },

    Subscription: {
        newTweet: {
            subscribe: (_, __, ___) => pubsub.asyncIterator(['NEW_POST']),
        }
    },

    Modifiers: {
        likesCount: (parent) => parent.likes.length,
        commentsCount: (parent) => parent.comments.length,
    }
}
