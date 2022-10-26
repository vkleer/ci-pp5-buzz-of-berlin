import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import appStyles from '../../App.module.css';
import styles from '../../styles/PostsFeed.module.css';
import { useLocation } from 'react-router';
import { axiosReq } from '../../api/axiosDefaults';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import NoResults from '../../assets/no-results.png';
import Post from './Post';
import Asset from '../../components/Asset';
import { fetchMoreData } from '../../utils/utils';

/**
 * Renders the PostsFeed - which contains multiple posts depending on the
 * filter that is or isn't applied to it.
 * The variables and logic have been created using the Moments walkthrough
 * and have been built upon/customised.
 */
function PostsFeed({ message, filter = "" }) {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const [query, setQuery] = useState('');

    /**
    * Fetches posts from the API.
    * Returns results based on search keywords.
    */
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
                        <InfiniteScroll 
                            children={
                            posts.results.map(post => (
                            <Post key={post.id} {...post} setPosts={setPosts} />
                            )) 
                            }
                            dataLength={posts.results.length}
                            loader={<Asset spinner />}
                            hasMore={!!posts.next}
                            next={() => fetchMoreData(posts, setPosts)}
                        />
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
            <Col lg={3} className="d-none d-lg-block p-0 py-2">
                <p className="text-white">Random profiles desktop</p>
            </Col>
        </Row>
    );
}

export default PostsFeed;