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
  }
  # write a type for movies

  type Movie {
    _id: ID!
    movieId: String
    image: String
    title: String
    description: String
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
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveMovie(input: savedMovie): User
    removeMovie(movieId: String!): User
  }
`;

module.exports = typeDefs;
