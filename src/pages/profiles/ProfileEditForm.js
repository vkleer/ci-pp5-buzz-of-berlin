import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import btnStyles from '../../styles/Button.module.css';
import appStyles from '../../App.module.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext';

/**
 * Renders the Profile component - which displays the users' profile picture
 * using the Avatar component, username and a follow/unfollow button.
 * The variables and logic have been created using the Moments walkthrough
 * and have been built upon/customised.
 */
const ProfileEditForm = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const { id } = useParams();
    const history = useHistory();
    const imageFile = useRef();

    const [profileData, setProfileData] = useState({
        description: '',
        image: '',
    });
    const { description, image } = profileData;

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const handleMount = async () => {
            if (currentUser?.profile_id?.toString() === id) {
                try {
                    const { data } = await axiosReq.get(`/profiles/${id}`);
                    const { description, image } = data;
                    setProfileData({ description, image });
                } catch (err) {
                    // console.log(err);
                    history.push("/");
                }
            } else {
                history.push("/");
            }
        };

        handleMount();

        return () => {
            setProfileData({});
        }
    }, [currentUser, history, id]);

    const handleChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("description", description);

        if (imageFile?.current?.files[0]) {
            formData.append("image", imageFile?.current?.files[0]);
        }

        try {
            const { data } = await axiosReq.put(`/profiles/${id}`, formData);
            setCurrentUser((currentUser) => ({
                ...currentUser,
                profile_image: data.image,
            }));
            history.goBack();
        } catch (err) {
            // console.log(err);
            setErrors(err.response?.data);
        }
    };

    const textFields = (
        <>
        <Form.Group>
            <Form.Label>Bio</Form.Label>
            <Form.Control
                as="textarea"
                value={description}
                onChange={handleChange}
                name="description"
                rows={7}
            />
        </Form.Group>

        {errors?.description?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
            {message}
            </Alert>
        ))}
        <Button className={`${btnStyles.Button}`} type="submit">
            Save
        </Button>
        <Button
            className={`${btnStyles.Button}`}
            onClick={() => history.goBack()}
        >
            Cancel
        </Button>
        </>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="m-0">
                <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
                    <Container className={appStyles.Content}>
                        <Form.Group>
                            {image && (
                                <figure>
                                    <Image src={image} fluid />
                                </figure>
                            )}
                            {errors?.image?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}
                            <div>
                                <Form.Label
                                    className={`${btnStyles.Button}btn my-auto`}
                                    htmlFor="image-upload"
                                >
                                    Change the image
                                </Form.Label>
                            </div>
                            <Form.File
                                id="image-upload"
                                ref={imageFile}
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                if (e.target.files.length) {
                                    setProfileData({
                                    ...profileData,
                                    image: URL.createObjectURL(e.target.files[0]),
                                    });
                                }
                                }}
                            />
                        </Form.Group>
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col md={4} lg={5} className="d-none d-md-block p-0 p-md-2 text-center">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
            </Row>
        </Form>
    );
};

export default ProfileEditForm;