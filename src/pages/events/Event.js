import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import styles from '../../styles/Post.module.css';
import appStyles from '../../App.module.css';

import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefaults';
import { DotsDropdown } from '../../components/DotsDropdown';

/**
 * Renders an individual Event object from the API.
 * The variables and logic have been created using the Moments walkthrough
 * and have been built upon/customised.
 */
const Event = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        likes_count,
        like_id,
        title,
        location_name,
        date,
        district,
        start_time,
        ticket_price,
        content,
        image,
        updated_date,
        setEvents,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/events/${id}/edit`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/events/${id}/`);
            history.goBack();
        } catch(err) {
            // console.log(err);
        }
    };

    const handleLike = async () => {
        try {
            const {data} = await axiosRes.post('/likes/', {event:id});
            setEvents((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                    ? {...post, likes_count: post.likes_count + 1, like_id: data.id}
                    : post;
                }),
            }));
        } catch(err) {
            console.log(err);
        }
    };

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}`);
            setEvents((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                    ? {...post, likes_count: post.likes_count - 1, like_id: null}
                    : post;
                }),
            }));
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <Card className={`${styles.Post} ${appStyles.FlatBoxBorder}`}>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} height={55} />
                    {owner}
                </Link>
                <div className="d-flex align-items-center">
                    <span>{updated_date}</span>
                    {is_owner && setEvents && (
                        <DotsDropdown 
                            handleEdit={handleEdit} 
                            handleDelete={handleDelete} 
                        />
                    )}
                </div>
                </Media>
            </Card.Body>
            <Link to={`/events/${id}`}>
                <Card.Img src={image} alt={title} />
            </Link>
            <Card.Body className={styles.CardBody}>
                {title && 
                    <Card.Title className="text-center">
                        {title} @ {location_name}
                    </Card.Title>
                }
                {district &&
                    <Card.Subtitle className="pb-4">
                        District: {district}
                    </Card.Subtitle>
                }
                {date && start_time &&
                    <Card.Subtitle> 
                        {date} starting at {start_time} <br/> 
                        {ticket_price ? (
                            `Entry fee: €${ticket_price} per ticket`
                        ) : (
                            `Entry fee: Free!`
                        )}
                    </Card.Subtitle>
                }
                {content && 
                    <Card.Text className="pt-4 pb-2">
                        {content}
                    </Card.Text>
                }
            </Card.Body>
        </Card>
    );
};

export default Event;