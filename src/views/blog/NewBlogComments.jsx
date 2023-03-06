import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const NewBlogComments = (props) => {
  const [comment, setComment] = useState({
    name: "",
    text: "",
  });

  const postComment = async () => {
    try {
      const apiUrl = process.env.REACT_APP_BE_URL;
      const res = await fetch(`${apiUrl}/blogPosts/${props._id}/comments`, {
        method: "POST",
        body: JSON.stringify(comment),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      if (res.ok) {
        setComment({
          authorName: "",
          text: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    console.log(comment);
    e.preventDefault();
    postComment();
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={comment.authorName}
            onChange={(e) =>
              setComment({ ...comment, authorName: e.target.value })
            }
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Text</Form.Label>
          <Form.Control
            value={comment.text}
            onChange={(e) => setComment({ ...comment, text: e.target.value })}
          ></Form.Control>
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default NewBlogComments;
