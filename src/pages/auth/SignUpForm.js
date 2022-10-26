import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'

import styles from '../../styles/LogInSignUpForm.module.css';
import btnStyles from '../../styles/Button.module.css';
import appStyles from '../../App.module.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

/**
 * Renders the SignUp form.
 * The variables and logic have been created using the Moments walkthrough
 * and have been built upon/customised.
 */
const SignUpForm = () => {
    const [signUpData, setSignUpData] = useState({
        username: '',
        password1: '',
        password2: '',
    });
    const {username, password1, password2} = signUpData;

    const [errors, setErrors] = useState({});

    const history = useHistory();

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/dj-rest-auth/registration/', signUpData);
            history.push('/login');
        } catch(err) {
            setErrors(err.response?.data)
        }
    }

    return (
        <Row className="m-0">
            <Col md={8}>
                <Container className={`${appStyles.Content} ${appStyles.FlatBoxBorder} ${styles.MaxFormWidth} p-4`}>
                    <h1 className={`pb-4 ${styles.Header}`}>Sign up</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label className="d-none">Username</Form.Label>
                            <Form.Control className={styles.Input} type="text" 
                                placeholder="Username" name="username" value={username}
                                onChange={handleChange} 
                            />
                        </Form.Group>
                        {errors.username?.map((message, idx) => 
                        <Alert variant="warning" key={idx}>{message}</Alert>
                        )}
                        <Form.Group controlId="password1">
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control className={styles.Input} type="password" 
                                placeholder="Password" name="password1" value={password1} 
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.password1?.map((message, idx) => 
                            <Alert variant="warning" key={idx}>{message}</Alert>
                        )}
                        <Form.Group controlId="password2">
                            <Form.Label className="d-none">Confirm password</Form.Label>
                            <Form.Control className={styles.Input} type="password" 
                                placeholder="Confirm password" name="password2" value={password2} 
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.password2?.map((message, idx) => 
                        <Alert variant="warning" key={idx}>{message}</Alert>
                        )}
                        <Button className={`${btnStyles.Button} ${btnStyles.Wide}`} 
                            type="submit">
                            Sign up
                        </Button>
                        {errors.non_field_errors?.map((message, idx) => 
                            <Alert variant="warning" key={idx} className="mt-3">{message}</Alert>
                        )}
                    </Form>
                </Container>
                <Container className={`mt-3 ${appStyles.Content} ${appStyles.FlatBoxBorder} ${styles.MaxFormWidth}`}>
                    <Link className={styles.Link} to="/login">
                        Already have an account? <span>Log in</span>
                    </Link>
                </Container>
            </Col>
        </Row>
    );
};

export default SignUpForm;