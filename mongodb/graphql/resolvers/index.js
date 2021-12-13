const commentsResolvers = require('./Comments')
const tweetsResolvers = require('./Tweets')
const usersResolvers = require('./Users')

module.exports = {
    Tweet: {
        ...tweetsResolvers.Modifiers,
    },
    Query: {
        ...tweetsResolvers.Query,
    },
    Mutation: {
        ...commentsResolvers.Mutation,
        ...tweetsResolvers.Mutation,
        ...usersResolvers.Mutation,
    },
    Subscription: {
        ...tweetsResolvers.Subscription,
    }
}