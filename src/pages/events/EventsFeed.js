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
import Event from './Event';
import Asset from '../../components/Asset';
import { fetchMoreData } from '../../utils/utils';
import PopularProfiles from '../../profiles/PopularProfiles';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

/**
 * Renders the EventsFeed - which contains multiple events depending 
 * on the filter that is or isn't applied to it.
 * The variables and logic have been created using the Moments walkthrough
 * and have been built upon/customised.
 */
function EventsFeed({ message, filter = "" }) {
    const [events, setEvents] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const [query, setQuery] = useState('');
    const currentUser = useCurrentUser();

    /**
    * Fetches events from the API.
    * Returns results based on search keywords.
    */
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await axiosReq.get(`/events/?${filter}search=${query}`);
                setEvents(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchEvents();
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
                        <Form.Control 
                            type="text" 
                            className="mr-sm-2" 
                            placeholder="Search posts" 
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                    </Form>
                </Container>
                {hasLoaded ? (
                <>
                    {events.results.length ? (
                        <Container className="p-0">
                            <InfiniteScroll 
                                children={
                                    events.results.map(event => (
                                <Event key={event.id} {...event} setEvents={setEvents} />
                                )) 
                                }
                                dataLength={events.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!events.next}
                                next={() => fetchMoreData(events, setEvents)}
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
            <Col xl={4} className={`d-none d-xl-block`}>
                <PopularProfiles />
            </Col>
        </Row>
    );
}

export default EventsFeed;