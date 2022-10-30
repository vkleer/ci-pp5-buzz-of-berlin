import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import styles from '../../styles/ProfilePage.module.css';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import Asset from '../../components/Asset';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosReq } from '../../api/axiosDefaults';
import { useProfileData, useSetProfileData } from '../../contexts/ProfileDataContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import NoResults from '../../assets/no-results.png';
import Post from '../posts/Post';
import Recommendation from '../recommendations/Recommendation';
import Event from '../events/Event';
import { fetchMoreData } from '../../utils/utils';
import PopularProfiles from './PopularProfiles';

/**
 * Renders the ProfilePage component - which displays the users' profile, 
 * containing the users' posts, recommendations and events.
 * The variables and logic have been created using the Moments walkthrough
 * and have been built upon/customised.
 */
function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [profilePosts, setProfilePosts] = useState({results: []});
    const [profileRecommendations, setProfileRecommendations] = useState({results: []});
    const [profileEvents, setProfileEvents] = useState({results: []});

    const currentUser = useCurrentUser();
    const {id} = useParams();

    const {setProfileData, handleFollow, handleUnfollow} = useSetProfileData();
    const {pageProfile} = useProfileData();

    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    {data: pageProfile}, 
                    {data: profilePosts},
                    {data: profileRecommendations},
                    {data: profileEvents},
                ] = await Promise.all([
                    axiosReq.get(`/profiles/${id}`),
                    axiosReq.get(`/posts/?owner__profile=${id}`),
                    axiosReq.get(`/recommendations/?owner__profile=${id}`),
                    axiosReq.get(`/events/?owner__profile=${id}`),
                ]);
                setProfileData(prevState => ({
                    ...prevState,
                    pageProfile: {results: [pageProfile]}
                }));
                setProfilePosts(profilePosts);
                setProfileRecommendations(profileRecommendations);
                setProfileEvents(profileEvents);
                setHasLoaded(true);
            } catch(err) {
                console.log(err);
            }
        }
            fetchData();    
    }, [id, setProfileData])

    const mainProfile = (
        <>
            <Row noGutters className="px-3 text-center">
                <Col lg={3} className="text-lg-left">
                    <Image 
                        className={styles.ProfileImage} 
                        roundedCircle
                        src={profile?.image}
                    />
                </Col>
                <Col  className="offset-lg-1" lg={6}>
                    <h3 className="my-2">{profile?.owner}</h3>
                    <Row className='justify-content-center no-gutters'>
                        <Col xs={6} className='my-2'>
                            <div className="fw-bold">{profile?.followers_count}</div>
                            <div>Followers</div>
                        </Col>
                        <Col xs={6} className='my-2'>
                            <div className="fw-bold">{profile?.following_count}</div>
                            <div>Following</div>
                        </Col> 
                    </Row>
                </Col>
                <Col lg={2} className="text-lg-right">
                    {currentUser && !is_owner && (profile?.following_id ? (
                        <Button 
                            className={
                                `${btnStyles.Button} m-2`
                            }
                        onClick={() => handleUnfollow(profile)}
                        >
                            Unfollow
                        </Button>
                    ) : (
                        <Button 
                            className={
                                `${btnStyles.Button} m-2`
                            }
                            onClick={() => handleFollow(profile)}
                        >
                            Follow
                        </Button>
                    ))}
                </Col>
                {profile?.content && (<Col className="p-3">{profile.content}</Col>)}
            </Row>
        </>
    );

    const mainProfilePosts = (
        <>
            <hr />
            <div className="text-center fw-bold">{profile?.posts_count}</div>
            <div className="text-center">Posts</div>
            <hr />
            {profilePosts.results.length ? (
                <InfiniteScroll
                    children={profilePosts.results.map((post) => (
                        <Post key={post.id} {...post} setPosts={setProfilePosts} />
                    ))}
                    dataLength={profilePosts.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!profilePosts.next}
                    next={() => fetchMoreData(profilePosts, setProfilePosts)}
                />
            ) : (
                <Asset 
                    src={NoResults}
                    message={`No results found, ${profile?.owner} hasn't posted any posts yet.`}
                />
            )}
            <hr />
            <div className="text-center fw-bold">{profile?.recommendations_count}</div>
            <div className="text-center">Recommendations</div>
            <hr />
            {profileRecommendations.results.length ? (
                <InfiniteScroll
                    children={profileRecommendations.results.map((recommendation) => (
                        <Recommendation key={recommendation.id} {...recommendation} setRecommendations={setProfileRecommendations} />
                    ))}
                    dataLength={profileRecommendations.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!profileRecommendations.next}
                    next={() => fetchMoreData(profileRecommendations, setProfileRecommendations)}
                />
            ) : (
                <Asset 
                    src={NoResults}
                    message={`No results found, ${profile?.owner} hasn't posted any recommendations yet.`}
                />
            )}
            <hr />
            <div className="text-center fw-bold">{profile?.events_count}</div>
            <div className="text-center">Events</div>
            <hr />
            {profileEvents.results.length ? (
                <InfiniteScroll
                    children={profileEvents.results.map((event) => (
                        <Event key={event.id} {...event} setEvents={setProfileEvents} />
                    ))}
                    dataLength={profileEvents.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!profileEvents.next}
                    next={() => fetchMoreData(profileEvents, setProfileEvents)}
                />
            ) : (
                <Asset 
                    src={NoResults}
                    message={`No results found, ${profile?.owner} hasn't posted any events yet.`}
                />
            )}
        </>
    );

    return (
        <Row className="m-0">
            <Col className="py-2 mb-4 p-0 p-lg-2" md={11} xl={7}>
                <PopularProfiles mobile />
                <Container className={`${appStyles.Content} ${appStyles.FlatBoxBorder}`}>
                    {hasLoaded ? (
                        <>
                        {mainProfile}
                        {mainProfilePosts}
                        </>
                    ) : (
                        <Asset spinner />
                    )}
                </Container>
            </Col>
            <Col xl={4} className="d-none d-xl-block pt-2">
                <PopularProfiles />
            </Col>
        </Row>
    );
}

export default ProfilePage;