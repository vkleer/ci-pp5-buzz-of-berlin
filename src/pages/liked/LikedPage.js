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
import Post from '../posts/Post';
import Recommendation from '../recommendations/Recommendation';
import Asset from '../../components/Asset';
import { fetchMoreData } from '../../utils/utils';
import PopularProfiles from '../profiles/PopularProfiles';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

/**
 * Renders the PostsFeed - which contains multiple posts depending on the
 * filter that is or isn't applied to it.
 * The variables and logic have been created using the Moments walkthrough
 * and have been built upon/customised.
 */
function LikedPage({ message, filter = "" }) {
    const [posts, setPosts] = useState({ results: [] });
    const [recommendations, setRecommendations] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const [query, setQuery] = useState('');
    const currentUser = useCurrentUser();

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
                // console.log(err);
            }
        };
        const fetchRecommendations = async () => {
            try {
                const { data } = await axiosReq.get(`/recommendations/?${filter}search=${query}`);
                setRecommendations(data);
                setHasLoaded(true);
            } catch (err) {
                // console.log(err);
            }
        };
        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchPosts();
            fetchRecommendations();
        }, 700);
        return () => {
            clearTimeout(timer);
        }
    }, [filter, query, pathname, currentUser]);

    return (
        <Row className="h-100 m-0">
            <Col className="py-2 p-0" md={11} xl={7}>
                <PopularProfiles mobile />
                {/* SearchBar */}
                <Container className="p-0">
                    <i className={`fas fa-search ${styles.SearchIcon}`} />
                    <Form 
                        className={`pb-4 ${styles.SearchBar}`} 
                        onSubmit={(event) => event.preventDefault()}
                    >
                        <Form.Group controlId="search-bar">
                            <Form.Label className="d-none">Search bar</Form.Label>
                            <Form.Control 
                                type="text" 
                                className="mr-sm-2" 
                                placeholder="Search posts" 
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Container>
                {hasLoaded ? (
                <>
                    {posts.results.length ? (
                        <Container className="p-0">
                            <hr />
                            <div className={`text-center ${appStyles.Content} ${appStyles.FlatBoxBorderSmall}`}>Liked posts</div>
                            <hr />
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
                            <hr />
                            <div className={`text-center ${appStyles.Content} ${appStyles.FlatBoxBorderSmall}`}>Liked recommendations</div>
                            <hr />
                            <InfiniteScroll 
                                children={
                                    recommendations.results.map(recommendation => (
                                        <Recommendation key={recommendation.id} {...recommendation} setRecommendations={setRecommendations} />
                                    )) 
                                }
                                dataLength={recommendations.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!recommendations.next}
                                next={() => fetchMoreData(recommendations, setRecommendations)}
                            />
                        </Container> 
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
            <Col xl={4} className="d-none d-xl-block pt-2">
                <PopularProfiles />
            </Col>
        </Row>
    );
}

export default LikedPage;