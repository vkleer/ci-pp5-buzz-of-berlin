import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import styles from '../../styles/ProfileEditUsernamePassword.module.css'

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext';

const ProfileEditUsername = () => {
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState({});

    const history = useHistory();
    const { id } = useParams();

    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    useEffect(() => {
            if (currentUser?.profile_id?.toString() === id) {
                setUsername(currentUser.username);
            } else {
                history.push("/");
            }
    }, [currentUser, history, id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.put("/dj-rest-auth/user/", {
                username,
            });
            setCurrentUser((prevUser) => ({
                ...prevUser,
                username,
            }));
            history.goBack();
        } catch (err) {
            // console.log(err);
            setErrors(err.response?.data);
        }
    };

    return (
        <Row className="m-0">
            <Col className="py-2 p-0 p-md-2 text-center" md={11}>
                <Container className={`${styles.MaxFormWidth} ${appStyles.Content}`}>
                    <Form onSubmit={handleSubmit} className="my-2">
                        <Form.Group>
                            <Form.Label>Change username</Form.Label>
                            <Form.Control
                                placeholder="username"
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </Form.Group>
                        {errors?.username?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        <Button
                            className={btnStyles.Button}
                            type="submit"
                        >
                        Save
                        </Button>
                        <Button
                            className={btnStyles.Button}
                            onClick={() => history.goBack()}
                        >
                            Cancel
                        </Button>
                    </Form>
                </Container>
            </Col>
        </Row>
    );
};

export default ProfileEditUsername;