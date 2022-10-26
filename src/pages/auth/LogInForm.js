import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import styles from '../../styles/LogInSignUpForm.module.css';
import btnStyles from '../../styles/Button.module.css';
import appStyles from '../../App.module.css';

import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import { useSetCurrentUser } from '../../contexts/CurrentUserContext';

/**
 * Renders the LogIn form.
 * The variables and logic have been created using the Moments walkthrough
 * and has been built upon/customised.
 */
function LogInForm() {
    const setCurrentUser = useSetCurrentUser();

    const [logInData, setLogInData] = useState({
        username: '',
        password: '',
    });
    const {username, password} = logInData;

    const [errors, setErrors] = useState({});

    const history = useHistory();

    const handleChange = (event) => {
        setLogInData({
            ...logInData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post('/dj-rest-auth/login/', logInData);
            setCurrentUser(data.user);
            history.push('/');
        } catch(err) {
            setErrors(err.response?.data);
        }
    }

    return (
        <Row className="m-0">
            <Col md={8}>
                <Container className={`${appStyles.Content} ${appStyles.FlatBoxBorder} p-4`}>
                    <h1 className={styles.Header}>Log in</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                        <Form.Label className="d-none">Enter username</Form.Label>
                        <Form.Control className={styles.Input} type="text" 
                            placeholder="Enter username" name="username" value={username}
                            onChange={handleChange} 
                        />
                        </Form.Group>
                        {errors.username?.map((message, idx) => 
                            <Alert variant="warning" key={idx}>{message}</Alert>
                        )}
                        <Form.Group controlId="password">
                        <Form.Label className="d-none">Password</Form.Label>
                        <Form.Control className={styles.Input} type="password" 
                            placeholder="Password" name="password" value={password} 
                            onChange={handleChange}
                        />
                        </Form.Group>
                        {errors.password?.map((message, idx) => 
                            <Alert variant="warning" key={idx}>{message}</Alert>
                        )}
                        <Button 
                            className={`${btnStyles.Button} ${btnStyles.Wide}`} 
                            type="submit"
                        >
                            Log in
                        </Button>
                        {errors.non_field_errors?.map((message, idx) => 
                            <Alert variant="warning" key={idx} className="mt-3">{message}</Alert>
                        )}
                    </Form>
                </Container>
                <Container className={`mt-3 ${appStyles.Content} ${appStyles.FlatBoxBorder}`}>
                    <Link className={styles.Link} to="/signup">
                        Don't have an account? <span>Sign up here!</span>
                    </Link>
                </Container>
            </Col>
        </Row>
    );
}

export default LogInForm;