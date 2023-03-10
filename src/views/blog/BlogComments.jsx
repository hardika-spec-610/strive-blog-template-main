import { Card } from "react-bootstrap";

const BlogComments = (props) => {
  return (
    <Card className="mt-3 p-3">
      <Card.Title>{props.authorName}</Card.Title>
      <Card.Body>{props.text}</Card.Body>
    </Card>
  );
};

export default BlogComments;
