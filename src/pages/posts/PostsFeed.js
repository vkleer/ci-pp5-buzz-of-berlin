import React, { useEffect, useState } from "react";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsFeed.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import NoResults from "../../assets/no-results.png";
import Post from "./Post";
import Asset from "../../components/Asset";

function PostsFeed({ message, filter = "" }) {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
                setPosts(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchPosts();
        }, 700);
        return () => {
            clearTimeout(timer);
        }
    }, [filter, query, pathname]);

    return (
        <Row className="h-100 m-0">
            <Col className="py-2 p-0" md={11} lg={8}>
                <p className="text-white">Random profiles mobile</p>
                {/* SearchBar */}
                <i className={`fas fa-search ${styles.SearchIcon}`} />
                <Form 
                    className={`pb-4 ${styles.SearchBar}`} 
                    onSubmit={(event) => event.preventDefault()}
                >
                <Form.Control 
                    type="text" 
                    className="mr-sm-2" 
                    placeholder="Search posts" 
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
                </Form>
                {hasLoaded ? (
                <>
                    {posts.results.length ? (
                    posts.results.map((post) => (
                        <Post key={post.id} {...post} setPosts={setPosts} />
                    ))
                    ) : (
                    <Container className={appStyles.Content}>
                        <h2 className="text-center">No results</h2>
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