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
 * Renders an individual Post object from the API.
 * The variables and logic have been created using the Moments walkthrough
 * and have been built upon/customised.
 */
const Post = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        title,
        district,
        caption,
        image,
        updated_date,
        setPosts,
        profilePost,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/posts/${id}/edit`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/posts/${id}/`);
            history.goBack();
        } catch(err) {
            // console.log(err);
        }
    };

    const handleLike = async () => {
        try {
            const {data} = await axiosRes.post('/likes/', {post:id});
            setPosts((prevPosts) => ({
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
            setPosts((prevPosts) => ({
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
        <Card className={`
        ${styles.Post} 
        ${profilePost ? 
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
                    {is_owner && setPosts && (
                        <DotsDropdown 
                            handleEdit={handleEdit} 
                            handleDelete={handleDelete} 
                        />
                    )}
                </div>
                </Media>
            </Card.Body>
            <Link to={`/posts/${id}`}>
                <Card.Img src={image} alt={title} />
            </Link>
            <Card.Body className={styles.CardBody}>
                {title && <Card.Title className="text-center">{title}</Card.Title>}
                {district && <Card.Subtitle className="pb-4">District: {district}</Card.Subtitle>}
                {caption && <Card.Text className="pb-2">{caption}</Card.Text>}
                <div className={styles.PostBar}>
                    {is_owner ? (
                        <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>You can't like your own post.</Tooltip>}
                        >
                        <i className="far fa-heart" />
                        </OverlayTrigger>
                    ) : like_id ? (
                        <span onClick={handleUnlike}>
                        <i className={`fas fa-heart ${styles.Heart}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleLike}>
                        <i className={`far fa-heart ${styles.HeartOutline}`} />
                        </span>
                    ) : (
                        <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Log in to like this post.</Tooltip>}
                        >
                        <i className="far fa-heart" />
                        </OverlayTrigger>
                    )}
                    {likes_count}
                    <Link to={`/posts/${id}`}>
                        <i className="far fa-comments" />
                    </Link>
                    {comments_count}
                </div>
            </Card.Body>
        </Card>
    );
};

export default Post;