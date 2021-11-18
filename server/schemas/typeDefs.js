// require apollo express
const { gql } = require("apollo-server-express");

// make typedefs
const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    movieCount: Int
    savedMovies: [Movie]
    thoughts: [Thought]
  }

  type Movie {
    _id: ID!
    movieId: String
    image: String
    title: String
    description: String
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  # type for authorization
  type Auth {
    token: ID!
    user: User
  }

  input savedMovie {
    movieId: String
    image: String
    title: String
    description: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveMovie(input: savedMovie): User
    removeMovie(movieId: String!): User
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;
