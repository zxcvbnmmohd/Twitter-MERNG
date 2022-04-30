const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Upload
  scalar Date

  type Tweet {
    id: ID!
    body: String!
    media: Media
    username: String!
    comments: [Comment!]
    commentsCount: Int!
    likes: [Like!]
    likesCount: Int!
    retweetedBy: [RetweetedBy!]
    createdAt: Date!
    updatedAt: Date!
  }
  
  type Media {
    filename: String
    mimetype: String
    encoding: String
  }
  
  type Comment {
    id: ID!
    username: String!
    body: String!
    createdAt: Date!
  }
  
  type Like {
    id: ID!
    username: String!
    createdAt: Date!
  }
  
  type RetweetedBy {
    id: ID!
    username: String!
    createdAt: Date!
  }
  
  type User {
    id: ID!
    selfie: String
    name: String!
    username: String!
    dob: Date!
    email: String!
    token: String!
    createdAt: Date!
    updatedAt: Date!
  }
  
  input RegisterInput {
    selfie: String
    name: String!
    username: String!
    dob: Date!
    email: String!
    password: String!
  }
  
  input LoginInput {
    username: String!
    password: String!
  }
  
  type Query {
    getTweets: [Tweet]
    getTweet(tweetID: ID!): Tweet!
  }
  
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
    createTweet(body: String!): Tweet!
    deleteTweet(tweetID: String!): String!
    
    createComment(tweetID: String!, body: String!): Tweet!
    deleteComment(tweetID: String!, commentID: String!): Tweet!
    
    toggleLike(tweetID: String!): Tweet!
    
    uploadMedia(file: Upload!): Media!
  }
  
  type Subscription {
    newTweet: Tweet!
  }
`;
