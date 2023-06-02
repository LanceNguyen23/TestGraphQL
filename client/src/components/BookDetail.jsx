import Card from "react-bootstrap/Card";
import { getSingleBook } from "../graphql/queries";
import { useQuery } from "@apollo/client";
// eslint-disable-next-line react/prop-types
const BookDetail = ({ bookId }) => {
  const { loading, error, data } = useQuery(getSingleBook, {
    variables: {
      bookId: bookId,
    },
    skip: bookId === null
  });

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p>Error loading book detail!!!</p>;

  const book = bookId !== null ? data.book : null;
  const author = book ? book.author : null;

  return (
    <Card bg="info" text="white" className="shadow">
      <Card.Body>
        {book === null ? (
          <Card.Text>Please select a book</Card.Text>
        ) : (
          <>
            <Card.Title>{book.name}</Card.Title>
            <Card.Subtitle>{book.genre}</Card.Subtitle>
            <p style={{marginTop: "10px", marginBottom: "0"}}>Name: {author.name}</p>
            <p style={{marginBottom: "0"}}>Age: {author.age}</p>
            <p style={{marginBottom: "0"}}>All books by this author</p>
            <ul>
              {author.books.map((book, id) => (
                <li key={id}>{book.name}</li>
              ))}
            </ul>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default BookDetail;
