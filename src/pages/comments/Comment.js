import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Media } from 'react-bootstrap';

import styles from '../../styles/Comment.module.css';

import { Avatar } from '../../components/Avatar';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefaults';
import { DotsDropdown } from '../../components/DotsDropdown';
import CommentEditForm from './CommentEditForm';

/**
 * Renders an individual Comment object from the API.
 * The variables and logic have been created using the Moments walkthrough
 * and have been built upon/customised.
 */
const Comment = (props) => {
    const {
        profile_id, profile_image, owner, updated_date, 
        content, id, setPost, setComments,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const [showEditForm, setShowEditForm] = useState(false);

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/comments/${id}/`);
            setPost(prevPost => ({
                results: [{
                    ...prevPost.results[0],
                    comments_count: prevPost.results[0].comments_count -1
                }]
            }))
            setComments(prevComments => ({
                ...prevComments,
                results: prevComments.results.filter(comment => comment.id !== id),
            }))
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <>
            <hr />
            <Media>
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} />
                </Link>
                <Media.Body className="align-self-center ml-2">
                    <span className={styles.Owner}>{owner}</span>
                    <span className={styles.Date}>{updated_date}</span>
                    {showEditForm ? (
                        <CommentEditForm
                            id={id}
                            profile_id={profile_id}
                            content={content}
                            profileImage={profile_image}
                            setComments={setComments}
                            setShowEditForm={setShowEditForm}
                        />
                    ) : (
                        <p>{content}</p>
                    )}
                </Media.Body>
                {is_owner && !showEditForm && (
                    <DotsDropdown
                        handleEdit={() => setShowEditForm(true)}
                        handleDelete={handleDelete}
                    />
                )}
            </Media>
        </>
    );
}

export default Comment