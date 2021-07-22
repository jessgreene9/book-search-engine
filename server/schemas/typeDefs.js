const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Book {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    input BookInput {
        bookId: String
        authors: [String]
        description: String
        image: String
        title: String
    }

    type Token {
       token: String
       user: User 
    }

    type Query {
        me: User
    }


    type Mutation {
        login(email: String!, password: String!): Token
        addUser(username: String!, password: String!, email: String!,): Token
        saveBook(input: BookInput!): User
        removeBook(bookId: String!): User 
    }

`

module.exports = typeDefs; 