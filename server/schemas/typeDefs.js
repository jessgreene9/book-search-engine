const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Book {
        authors: [String]
        description: String
        bookId: ID!
        image: String
        link: String
        title: String
    }

    type User {
        _id: ID!
        username: String!
        email: String
        password: String
        bookCount: Int
        savedBooks: [Book]
    }

    input BookInput {
        bookId: String
        authors: [String]
        description: String
        image: String
        link: String
        title: String
    }


    type Auth {
    token: ID!
    user: User
  }

   

    type Query {
        me: User
    }


    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, password: String!, email: String!,): Auth
        saveBook(input: BookInput!): User
        removeBook(bookId: String!): User 
    }

`

module.exports = typeDefs; 