import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import appStyles from '../../App.module.css';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import { axiosReq } from '../../api/axiosDefaults';
import Post from './Post';

/**
 * Renders the PostPage - which is a detailed page of an individual post.
 * The variables and logic have been created using the Moments walkthrough
 * and have been built upon/customised.
 */
function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
        ]);
        setPost({ results: [post] });
        console.log(post);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100 m-0">
      <Col className="py-2 p-0" md={11} lg={8}>
        <p className="text-white">Random profiles mobile</p>
        <Post 
          {...post.results[0]} 
          setPosts={setPost} 
          postPage 
        />
        <Container className={appStyles.Content}>
          Comments
        </Container>
      </Col>
      <Col lg={3} className="d-none d-lg-block p-0 py-2 text-white">
        <p className="text-white">Random profiles desktop</p>
      </Col>
    </Row>
  );
}

export default PostPage;