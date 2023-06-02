import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useQuery, useMutation } from "@apollo/client";
import { getAuthors, getBooks } from "../graphql/queries";
import { useState } from "react";
import { addAuthor, addBook } from "../graphql/mutations"

const Forms = () => {
  const [newBook, setNewBook] = useState({name: "", genre:"", authorId: ""})
  const [newAuthor, setNewAuthor] = useState({name: "", age: ""})
  
  const onInputBookChange = e => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value
    })
  }
  const onInputAuthorChange = e => {
    setNewAuthor({
      ...newAuthor,
      [e.target.name]: e.target.name === "age" ? parseInt(e.target.value) : e.target.value
    })
  }

  const handleCreateBook = e => {
    e.preventDefault()
    createBook({
      variables: {
        name: newBook.name,
        genre: newBook.genre,
        authorId: newBook.authorId
      },
      refetchQueries: [{query: getBooks}]
    })
    setNewBook({name: "", genre:"", authorId: ""})
  }
  const handleCreateAuthor = e => {
    e.preventDefault()
    createAuthor({
      variables: {
        name: newAuthor.name,
        age: newAuthor.age
      },
      refetchQueries: [{query: getAuthors}]
    })
    setNewAuthor({name: "", age: ""})
  }

  // eslint-disable-next-line no-unused-vars
  const [createBook, dataMutationBook] = useMutation(addBook)
  // console.log(dataMutationBook)
  // eslint-disable-next-line no-unused-vars
  const [createAuthor, dataMutationAuthor] = useMutation(addAuthor)
  
  // eslint-disable-next-line no-unused-vars
  const { loading, error, data } = useQuery(getAuthors);
  return (
    <Row>
      <Col>
        <Form>
          <Form.Group style={{ marginBottom: "15px" }}>
            <Form.Control type="text" placeholder="Book name" name="name" onChange={onInputBookChange} value={newBook.name}/>
          </Form.Group>
          <Form.Group style={{ marginBottom: "15px" }}>
            <Form.Control type="text" placeholder="Book genre" name="genre" onChange={onInputBookChange} value={newBook.genre}/>
          </Form.Group>
          <Form.Group style={{ marginBottom: "15px" }}>
            {loading ? (
              <p>Loading authors...</p>
            ) : (
              <Form.Select aria-label="Default select example"  name="authorId" onChange={onInputBookChange} value={newBook.authorId}>
                <option>Select author</option>
                {data.authors.map((author, id) => (
                  <option key={id} value={author.id}>{author.name}</option>
                ))}
              </Form.Select>
            )}
          </Form.Group>
          <Button className="float-end" variant="info" type="submit" onClick={handleCreateBook}>
            Add Book
          </Button>
        </Form>
      </Col>
      <Col>
        <Form.Group style={{ marginBottom: "15px" }} className="invisible">
          <Form.Control />
        </Form.Group>
        <Form.Group style={{ marginBottom: "15px" }}>
          <Form.Control type="text" placeholder="Author name" name="name" onChange={onInputAuthorChange} value={newAuthor.name}/>
        </Form.Group>
        <Form.Group style={{ marginBottom: "15px" }}>
          <Form.Control type="number" placeholder="Author age" name="age" onChange={onInputAuthorChange} value={newAuthor.age}/>
        </Form.Group>
        <Button className="float-end" variant="info" type="submit" onClick={handleCreateAuthor}>
          Add Author
        </Button>
      </Col>
    </Row>
  );
};

export default Forms;
