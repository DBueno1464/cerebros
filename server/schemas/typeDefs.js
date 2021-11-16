// require apollo express
const { gql } = require('apollo-server-express');

// make typedefs
const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String
        # gamesPlayed: Int 
        # add a savedGames property when needed
    }
    # write a type for games

    # type for authorization
    type Auth {
        token: ID!
        user: User 
    }

    type Query {
        users: [User]
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;