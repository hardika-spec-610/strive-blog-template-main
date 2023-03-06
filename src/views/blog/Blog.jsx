import React, { useEffect, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import { format, parseISO } from "date-fns";
// import posts from "../../data/posts.json";
import "./styles.css";
import BlogComments from "./BlogComments";
import NewBlogComments from "./NewBlogComments";

const Blog = (props) => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getBlogpost = async (id) => {
    try {
      const apiUrl = process.env.REACT_APP_BE_URL;
      const res = await fetch(`${apiUrl}/blogPosts/${id}`);
      if (res.ok) {
        const data = await res.json();
        setBlog(data);
        setLoading(false);
        console.log(blog);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const postImage = async (image) => {
    const formData = new FormData();
    formData.append("cover", image);
    try {
      const apiUrl = process.env.REACT_APP_BE_URL;
      let res = await fetch(`${apiUrl}/${params._id}/uploadCover`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        console.log("Image Uploaded Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postImage(image);
  };
  useEffect(() => {
    const { _id } = params;
    console.log("param", params);
    getBlogpost(_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="blog-details-root">
        <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
            <Button
              className="mt-2"
              variant="primary"
              onClick={handleClose}
              type="submit"
              width="500px"
            >
              Post Image
            </Button>
          </form>
          <h1 className="blog-details-title">{blog.title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{format(parseISO(blog.createdAt), "dd MMM yyyy")}</div>
              <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
          {blog.comments &&
            blog.comments.map((c) => <BlogComments key={c._id} {...c} />)}
          <NewBlogComments _id={params._id} />
        </Container>
      </div>
    );
  }
};

export default Blog;
