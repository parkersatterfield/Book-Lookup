const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: Book!
  }

  type Book {
    authors: String!
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    getMe(_id:ID): User
  }

  type Mutation {
    login(email: String, password: String): Auth
    addUser(email: String, username: String, password: String, _id: ID): User
    saveBook(authors: String!, description: String, title: String, bookId: String, image: String, link: String): User
    removeBook(bookId: ID): User
  }
`;

module.exports = typeDefs;
