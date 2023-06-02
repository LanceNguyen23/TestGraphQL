import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookDetail from "./BookDetail";
import { useQuery } from "@apollo/client";
import { getBooks } from "../graphql/queries";
import { useState } from "react";

const BookList = () => {
  const [bookId, setBookId] = useState(null)

  const { loading, error, data } = useQuery(getBooks);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error loading books!!!</p>;


  return (
    <Row style={{ height: "420px" }}>
      <Col xs={8}>
        <Row
          xs={1}
          md={3}
          className="g-2"
          style={{ maxHeight: "430px", overflow: "auto" }}
        >
          {data.books.map((book, i) => {
            return (
              <Col key={i}>
                <Card
                  border="info"
                  text="info"
                  className="text-center shadow mb-2"
                  onClick={()=>setBookId(book.id)}
                >
                  <Card.Body>{book.name}</Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Col>
      <Col xs={4}>
        <BookDetail bookId={bookId}/>
      </Col>
    </Row>
  );
};

export default BookList;
