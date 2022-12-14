import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import styles from '../../styles/Event.module.css';
import appStyles from '../../App.module.css';

import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';

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
        profileEvent,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const [year, month, day] = date?.split('-') ?? [];
    const [hour, minute] = start_time?.split(':') ?? [];

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

    return (
        <Card className={
            `${appStyles.Component} 
            ${profileEvent ? 
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
                {date && start_time &&
                    <Card.Text> 
                        Date: <span className={styles.CardSpan}>{`${day}.${month}.${year}`}</span> <br/> 
                        Starts at: <span className={styles.CardSpan}>{`${hour}:${minute}`}</span> <br/> 
                        {ticket_price ? (
                            <>Entry fee: <span className={styles.CardSpan}>???{ticket_price} per ticket</span></>
                        ) : (
                            <>Entry fee: <span className={styles.CardSpan}>Free!</span></>
                        )}
                    </Card.Text>
                }
                {content && 
                    <Card.Text className="pb-2">
                        {content}
                    </Card.Text>
                }
            </Card.Body>
        </Card>
    );
};

export default Event;