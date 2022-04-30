const {
    AuthenticationError,
    UserInputError,
} = require("apollo-server-express");
const Tweet = require("../../models/Tweet");
const checkAuth = require("../../utils/check-auth");

module.exports = {
    Mutation: {
        createComment: async (_, { tweetID, body }, context) => {
            console.log("createComment()");
            const user = checkAuth(context);
            console.log(user);

            if (body.trim() === "") {
                throw new UserInputError("Empty Comment", {
                    errors: {
                        body: "Comment cannot be empty...",
                    },
                });
            }

            const tweet = await Tweet.findById(tweetID);

            if (tweet) {
                tweet.comments.unshift({
                    body,
                    username: user.username,
                    createdAt: new Date().toISOString(),
                });

                await tweet.save();
                return tweet;
            } else {
                throw new UserInputError("Tweet not found...");
            }
        },
        deleteComment: async (_, { tweetID, commentID }, context) => {
            console.log("deleteComment()");
            const user = checkAuth(context);
            console.log(user);

            const tweet = await Tweet.findById(tweetID);

            if (tweet) {
                const commentIndex = tweet.comments.findIndex(
                    (comment) => comment.id === commentID
                );
                if (commentIndex >= 0) {
                    if (tweet.comments[commentIndex].username === user.username) {
                        tweet.comments.splice(commentIndex, 1);
                        await tweet.save();
                        return tweet;
                    } else {
                        throw new AuthenticationError("This ain't your tweet man...");
                    }
                } else {
                    throw new UserInputError("Comment not found...");
                }
            } else {
                throw new UserInputError("Tweet not found...");
            }
        },
    },
};
