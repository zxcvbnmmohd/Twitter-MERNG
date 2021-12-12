const { gql } = require("apollo-server-express");

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    comments: [Comment!]
    commentsCount: Int!
    likes: [Like!]
    likesCount: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Comment {
    id: ID!
    username: String!
    body: String!
    createdAt: String
  }
  type Like {
    id: ID!
    username: String!
    createdAt: String
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
    getPosts: [Post]
    getPost(postID: ID!): Post!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
    createPost(body: String!): Post!
    deletePost(postID: String!): String!
    
    createComment(postID: String!, body: String!): Post!
    deleteComment(postID: String!, commentID: String!): Post!
    
    toggleLike(postID: String!): Post!
  }
  type Subscription {
    newPost: Post!
  }
`;
