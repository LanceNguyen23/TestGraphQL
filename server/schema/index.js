import { books, authors } from "../data/static.js";
import { Book } from "../models/Book.js";
import { Author } from "../models/Author.js";
export const typeDefs = `
    type Book {
        id: ID
        name: String
        genre: String
        author: Author
    }

    type Author {
        id: ID!
        name: String
        age: Int
        books: [Book]
    }

    # ROOT TYPE
    type Query {
        books: [Book]
        book (id: ID!): Book
        authors: [Author]
        author (id: ID!): Author
    }

    type Mutation {
        createAuthor(name: String, age: Int): Author
        createBook(name: String, genre: String, authorId: ID!): Book
    }
`;

export const resolvers = {
  Query: {
    books: async (parent, args, context) => await context.getAllBooks(),
    book: async (parent, args, context) => await context.getBookById(args.id),
    authors: async (parent, args, context) => await context.getAllAuthors(),
    author: async (parent, args, context) =>
      await context.getAuthorById(args.id),
  },

  Book: {
    author: async (parent, args, context) =>
      await context.getAuthorById(parent.authorId),
  },

  Author: {
    books: async (parent, args, context) =>
      await context.getAllBooks({ authorId: parent.id }),
  },

  // MUTATION
  Mutation: {
    createAuthor: async (parent, args, context) =>
      await context.createAuthor(args),
    createBook: async (parent, args, context) => await context.createBook(args),
  },
};
