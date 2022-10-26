import React, { useEffect, useState } from "react";

import appStyles from "../../App.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import NoResults from "../../assets/upload.png";
import Post from "./Post";
import Asset from "../../components/Asset";

function PostsFeed({ message, filter = "" }) {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
        try {
            const { data } = await axiosReq.get(`/posts/?${filter}`);
            setPosts(data);
            setHasLoaded(true);
        } catch (err) {
            console.log(err);
        }
        };

        setHasLoaded(false);
        fetchPosts();
    }, [filter, pathname]);

    return (
        <Row className="h-100 m-0">
            <Col className="py-2 p-0" md={11} lg={8}>
                <p className="text-white">Random profiles mobile</p>
                {hasLoaded ? (
                <>
                    {posts.results.length ? (
                    posts.results.map((post) => (
                        <Post key={post.id} {...post} setPosts={setPosts} />
                    ))
                    ) : (
                    <Container className={appStyles.Content}>
                        <Asset src={NoResults} message={message} />
                    </Container>
                    )}
                </>
                ) : (
                <Container className={appStyles.Content}>
                    <Asset spinner />
                </Container>
                )}
            </Col>
            <Col lg={3} className="d-none d-lg-block p-0">
                <p className="text-white">Random profiles desktop</p>
            </Col>
        </Row>
    );
}

export default PostsFeed;