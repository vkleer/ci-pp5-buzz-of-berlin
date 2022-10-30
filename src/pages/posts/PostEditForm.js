import React, { useState, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';

import styles from '../../styles/PostCreateEditForm.module.css';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { Image } from 'react-bootstrap';

import { axiosReq } from '../../api/axiosDefaults';

/**
 * Renders the PostEditForm component - which is where a Post can be edited.
 * The variables and logic have been created using the Moments walkthrough
 * and have been built upon/customised.
 */
function PostEditForm() {
    const [postData, setPostData] = useState({
        title: '',
        district: '',
        caption: '',
        image: '',
    });
    const {title, district, caption, image} = postData;

    const imageInput = useRef(null);
    const history = useHistory();
    const {id} = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const {data} = await axiosReq.get(`/posts/${id}/`);
                const {title, district, caption, image, is_owner} = data;

                is_owner ? setPostData({title, district, caption, image}) : history.push('/');
            } catch(err) {
                // console.log(err);
            }
        };
        
        handleMount();
    }, [history, id]);

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
    
        formData.append('title', title);
        formData.append('district', district);
        formData.append('caption', caption);

        if (imageInput?.current?.files[0]){
            formData.append('image', imageInput.current.files[0]);
        }
    
        try {
            await axiosReq.put(`/posts/${id}/`, formData);
            history.push(`/posts/${id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

  const textFields = (
    <div className="text-center">
        <Form>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control 
                    type="text" name="title" value={title} 
                    onChange={handleChange} 
                /> 
            </Form.Group>
            {errors.title?.map((message, idx) => 
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}
            <Form.Group>
                <Form.Label>District</Form.Label>
                <Form.Control
                    as="select"
                    name="district"
                    className="form-select"
                    value={district}
                    onChange={handleChange}
                    aria-label="district"
                >
                    <option value="">Select district</option>
                    <option value="Friedrichshain-Kreuzberg">Friedrichshain-Kreuzberg</option>
                    <option value="Lichtenberg">Lichtenberg</option>
                    <option value="Marzahn-Hellersdorf">Marzahn-Hellersdorf</option>
                    <option value="Mitte">Mitte</option>
                    <option value="Neukölln">Neukölln</option>
                    <option value="Pankow">Pankow</option>
                    <option value="Reinickendorf">Reinickendorf</option>
                    <option value="Spandau">Spandau</option>
                    <option value="Steglitz-Zehlendorf">Steglitz-Zehlendorf</option>
                    <option value="Tempelhof-Schöneberg">Tempelhof-Schöneberg</option>
                    <option value="Treptow-Köpenick">Treptow-Köpenick</option>
                </Form.Control>
            </Form.Group>
            {errors.district?.map((message, idx) => 
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}
            <Form.Group>
                <Form.Label>Caption</Form.Label>
                <Form.Control 
                    as="textarea" rows={6} name="caption" value={caption}
                    onChange={handleChange}  
                />
            </Form.Group>
            {errors.caption?.map((message, idx) => 
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}
        </Form>
        <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
            Edit post
        </Button>
        <Button
            className={`${btnStyles.Button} ${btnStyles.Blue}`}
            onClick={() => history.goBack()}
        >
            Cancel
        </Button>
    </div>
  );

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="m-0">
                <Col className="py-2 p-0 p-md-2" md={11} lg={7}>
                    <Container
                        className={`${appStyles.Content} ${appStyles.FlatBoxBorder} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">
                            <figure>
                                <Image className={appStyles.Image} src={image} />
                            </figure>
                            <div>
                                <Form.Label
                                    className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                                    htmlFor="image-upload"
                                >
                                    Change image
                                </Form.Label>
                            </div>
                            <Form.File 
                                id="image-upload" 
                                accept="image/*" 
                                onChange={handleChangeImage} 
                                ref={imageInput}
                                style={{ display: 'none' }}
                            />
                        </Form.Group>
                        {errors.image?.map((message, idx) => 
                            <Alert variant="warning" key={idx}>{message}</Alert>
                        )}
                    <div className="d-md-none">{textFields}</div>
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-md-2">
                <Container className={`${appStyles.Content} ${appStyles.FlatBoxBorder}`}>{textFields}</Container>
            </Col>
        </Row>
        </Form>
    );
}

export default PostEditForm;