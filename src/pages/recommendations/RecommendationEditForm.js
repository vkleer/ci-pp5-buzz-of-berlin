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
 * Renders the RecommendationEditForm component - which is where a Recommendation can be edited.
 * The variables and logic have been created using the Moments walkthrough
 * and have been built upon/customised.
 */
function RecommendationEditForm() {
    const [recommendationData, setRecommendationData] = useState({
        title: '',
        location_name: '',
        district: '',
        entry_fee: '',
        price: '',
        content: '',
        image: '',
    });
    const {title, location_name, district, entry_fee, price, content, image} = recommendationData;

    const imageInput = useRef(null);
    const history = useHistory();
    const {id} = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const {data} = await axiosReq.get(`/recommendations/${id}/`);
                const {title, location_name, district, entry_fee, price, content, image, is_owner} = data;

                is_owner ? setRecommendationData({title, location_name, district, entry_fee, price, content, image}) : history.push('/');
            } catch(err) {
                // console.log(err);
            }
        };
        
        handleMount();
    }, [history, id]);

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setRecommendationData({
            ...recommendationData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setRecommendationData({
                ...recommendationData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
    
        formData.append('title', title);
        formData.append('district', district);
        formData.append('location_name', location_name);
        formData.append('entry_fee', entry_fee);
        formData.append('price', price);
        formData.append('content', content);

        if (imageInput?.current?.files[0]){
            formData.append('image', imageInput.current.files[0]);
        }
    
        try {
            await axiosReq.put(`/recommendations/${id}/`, formData);
            history.push(`/recommendations/${id}`);
        } catch (err) {
            // console.log(err);
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
                        type="text" 
                        name="title" 
                        value={title} 
                        onChange={handleChange} 
                        aria-label="title"
                    /> 
                </Form.Group>
                {errors.title?.map((message, idx) => 
                    <Alert variant="warning" key={idx}>{message}</Alert>
                )}
                <Form.Group>
                    <Form.Label>Location name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="location_name" 
                        value={location_name} 
                        onChange={handleChange} 
                        aria-label="location_name"
                    /> 
                </Form.Group>
                {errors.location_name?.map((message, idx) => 
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
                        <option value="Neuk??lln">Neuk??lln</option>
                        <option value="Pankow">Pankow</option>
                        <option value="Reinickendorf">Reinickendorf</option>
                        <option value="Spandau">Spandau</option>
                        <option value="Steglitz-Zehlendorf">Steglitz-Zehlendorf</option>
                        <option value="Tempelhof-Sch??neberg">Tempelhof-Sch??neberg</option>
                        <option value="Treptow-K??penick">Treptow-K??penick</option>
                    </Form.Control>
                </Form.Group>
                {errors.district?.map((message, idx) => 
                    <Alert variant="warning" key={idx}>{message}</Alert>
                )}
                <Form.Group>
                    <Form.Label>Entry fee</Form.Label>
                    <Form.Control
                        as="select"
                        name="entry_fee"
                        className="form-select"
                        value={entry_fee}
                        onChange={handleChange}
                        aria-label="entry_fee"
                    >
                        <option value="">Select entry fee</option>
                        <option value="Free">Free</option>
                        <option value="???1,00 to ???5,00">???1,00 to ???5,00</option>
                        <option value="???5,00 to ???10,00">???5,00 to ???10,00</option>
                        <option value="???10,00 to ???15,00">???10,00 to ???15,00</option>
                        <option value="???15,00 to ???20,00">???15,00 to ???20,00</option>
                        <option value="???20,00 to ???30,00">???20,00 to ???30,00</option>
                        <option value="???50,00 to ???100,00">???50,00 to ???100,00</option>
                        <option value="???100,00 or more">???100,00 or more</option>
                    </Form.Control>
                </Form.Group>
                {errors.district?.map((message, idx) => 
                    <Alert variant="warning" key={idx}>{message}</Alert>
                )}
                <Form.Group>
                    <Form.Label>Price category</Form.Label>
                    <Form.Control
                        as="select"
                        name="price"
                        className="form-select"
                        value={price}
                        onChange={handleChange}
                        aria-label="price"
                    >
                        <option value="">Select price category</option>
                        <option value="Free">Free</option>
                        <option value="???">???</option>
                        <option value="??????">??????</option>
                        <option value="?????????">?????????</option>
                        <option value="????????????">????????????</option>
                    </Form.Control>
                </Form.Group>
                {errors.entry_fee?.map((message, idx) => 
                    <Alert variant="warning" key={idx}>{message}</Alert>
                )}
                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={6} 
                        name="content" 
                        value={content}
                        onChange={handleChange}  
                        aria-label="content"
                    />
                </Form.Group>
                {errors.content?.map((message, idx) => 
                    <Alert variant="warning" key={idx}>{message}</Alert>
                )}
            </Form>
            <Button className={`${btnStyles.Button}`} type="submit">
                Post
            </Button>
            <Button
                className={`${btnStyles.Button}`}
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
                                    className={`${btnStyles.Button} btn`}
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

export default RecommendationEditForm;