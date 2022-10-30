import React, { useState } from "react";
import { Link } from "react-router-dom";

import appStyles from '../../App.module.css'
import btnStyles from '../../styles/Button.module.css'
import styles from "../../styles/CommentCreateEditForm.module.css";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { Avatar } from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

/**
 * Renders the CommenCreate form - which is where a comment can be created.
 * The variables and logic have been created using the Moments walkthrough
 * and have been built upon/customised.
 */
function CommentCreateForm(props) {
    const { post, recommendation, setItem, setComments, profileImage, profile_id } = props;
    const [content, setContent] = useState("");

    const handleChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axiosRes.post("/comments/", {
                content,
                post,
                recommendation,
            });
            setComments((prevComments) => ({
                ...prevComments,
                results: [data, ...prevComments.results],
            }));
            setItem((prevItem) => ({
                results: [
                {
                    ...prevItem.results[0],
                    comments_count: prevItem.results[0].comments_count + 1,
                },
                ],
            }));
            setContent("");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Form className="mt-2" onSubmit={handleSubmit}>
            <Form.Group>
                <InputGroup>
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profileImage} />
                </Link>
                <Form.Control
                    className={`${appStyles.FlatBoxBorderSmall} ${styles.Form}`}
                    placeholder="Add a comment..."
                    as="textarea"
                    value={content}
                    onChange={handleChange}
                    rows={2}
                />
                </InputGroup>
            </Form.Group>
            <button
                className={`${btnStyles.Button} btn d-block ml-auto`}
                disabled={!content.trim()}
                type="submit"
            >
                Post
            </button>
        </Form>
    );
}

export default CommentCreateForm;