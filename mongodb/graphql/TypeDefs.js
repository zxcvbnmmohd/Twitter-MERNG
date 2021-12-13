const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Upload
  
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
    createdAt: String!
    updatedAt: String!
  }
  
  type Media {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  
  type Comment {
    id: ID!
    username: String!
    body: String!
    createdAt: String!
  }
  
  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }
  
  type RetweetedBy {
    id: ID!
    username: String!
    createdAt: String!
  }
  
  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
    updatedAt: String!
  }
  
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
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
