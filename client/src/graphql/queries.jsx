import { gql } from "@apollo/client";

export const getBooks = gql`
  query getBooks {
    books {
      name
      id
    }
  }
`;

export const getSingleBook = gql`
  query getSingleBook($bookId: ID!) {
    book(id: $bookId) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          id
          name
        }
      }
    }
  }
`;

export const getAuthors = gql`
  query getAuthors {
    authors {
      id
      name
    }
  }
`;


