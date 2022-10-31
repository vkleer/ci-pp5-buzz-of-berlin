import React from 'react';
import { Link, useHistory } from 'react-router-dom';


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
 * Renders an individual Recommendation object from the API.
 * The variables and logic have been created using the Moments walkthrough
 * and have been built upon/customised.
 */
const Recommendation = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        title,
        location_name,
        district,
        entry_fee,
        price,
        content,
        image,
        updated_date,
        setRecommendations,
        profileRecommendation,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/recommendations/${id}/edit`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/recommendations/${id}/`);
            history.goBack();
        } catch(err) {
            // console.log(err);
        }
    };

    const handleLike = async () => {
        try {
            const {data} = await axiosRes.post('/likes/', {recommendation:id});
            setRecommendations((prevRecommendations) => ({
                ...prevRecommendations,
                results: prevRecommendations.results.map((recommendation) => {
                    return recommendation.id === id
                    ? {...recommendation, likes_count: recommendation.likes_count + 1, like_id: data.id}
                    : recommendation;
                }),
            }));
        } catch(err) {
            // console.log(err);
        }
    };

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}`);
            setRecommendations((prevRecommendations) => ({
                ...prevRecommendations,
                results: prevRecommendations.results.map((recommendation) => {
                    return recommendation.id === id
                    ? {...recommendation, likes_count: recommendation.likes_count - 1, like_id: null}
                    : recommendation;
                }),
            }));
        } catch(err) {
            // console.log(err);
        }
    };

    return (
        <Card className={`
            ${appStyles.Component} 
            ${profileRecommendation ? 
                (
                    appStyles.FlatBoxBorderSmall
                ) : (
                    appStyles.FlatBoxBorder
                )
            }`}>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} height={55} />
                    {owner}
                </Link>
                <div className="d-flex align-items-center">
                    <span>{updated_date}</span>
                    {is_owner && setRecommendations && (
                        <DotsDropdown 
                            handleEdit={handleEdit} 
                            handleDelete={handleDelete} 
                        />
                    )}
                </div>
                </Media>
            </Card.Body>
            <Link to={`/recommendations/${id}`}>
                <Card.Img src={image} alt={title} />
            </Link>
            <Card.Body className={appStyles.CardBody}>
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
                {entry_fee && price &&
                    <Card.Subtitle> 
                        Entry fee: {entry_fee} | Price category: {price} <br/> 
                    </Card.Subtitle>
                }
                {content && 
                    <Card.Text className="pt-4 pb-2">
                        {content}
                    </Card.Text>
                }
                <div className={appStyles.ComponentBar}>
                    {is_owner ? (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>You can't like your own recommendation.</Tooltip>}
                        >
                            <i className="far fa-heart" />
                        </OverlayTrigger>
                    ) : like_id ? (
                        <span onClick={handleUnlike}>
                            <i className={`fas fa-heart ${appStyles.Heart}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleLike}>
                            <i className={`far fa-heart ${appStyles.HeartOutline}`} />
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Log in to like this recommendation.</Tooltip>}
                        >
                            <i className="far fa-heart" />
                        </OverlayTrigger>
                    )}
                    {likes_count}
                    <Link to={`/recommendations/${id}`}>
                        <i className="far fa-comments" />
                    </Link>
                    {comments_count}
                </div>
            </Card.Body>
        </Card>
    );
};

export default Recommendation;