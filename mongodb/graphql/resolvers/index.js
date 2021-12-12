const commentsResolvers = require('./Comments')
const postsResolvers = require('./Posts')
const usersResolvers = require('./Users')

module.exports = {
    Post: {
        ...postsResolvers.Modifiers,
    },
    Query: {
        ...postsResolvers.Query,
    },
    Mutation: {
        ...commentsResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...usersResolvers.Mutation,
    },
    Subscription: {
        ...postsResolvers.Subscription,
    }
}