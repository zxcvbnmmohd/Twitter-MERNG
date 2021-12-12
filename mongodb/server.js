require("dotenv").config();

const express = require("express")
const http = require("http")
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express")
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core")
const { execute, subscribe } = require("graphql")
const { SubscriptionServer } = require("subscriptions-transport-ws")
const { makeExecutableSchema } = require("@graphql-tools/schema")

const typeDefs = require("./graphql/TypeDefs");
const resolvers = require("./graphql/resolvers");

startApolloServer(typeDefs, resolvers)

async function startApolloServer(typeDefs, resolvers) {
    const app = express()
    const httpServer = http.createServer(app)
    const schema = makeExecutableSchema({ typeDefs, resolvers })
    
    const subscriptionServer = SubscriptionServer.create(
        { schema, execute, subscribe, },
        { server: httpServer, path: '/', }
    )
    
    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            subscriptionServer.close();
                        }
                    };
                }
            },
        ],
        context: ({ req }) => ({ req }),
    })

    await server.start()
    server.applyMiddleware({ app, path: '/', })

    mongoose
        .connect(process.env.mongodbCluster, { useNewUrlParser: true })
        .then(() => {
            console.log("Connected to MongoDB");
            return httpServer.listen({ port: process.env.port });
        })
        .then((res) => {
            console.log(`🚀 Server ready => http://localhost:${process.env.port}${server.graphqlPath}`);
        })
}
