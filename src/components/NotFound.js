import React from 'react';
import { NavLink } from 'react-router-dom';

import appStyles from '../App.module.css';
import btnStyles from '../styles/Button.module.css'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Asset from './Asset';
import NoResults from '../assets/no-results.png';
import PopularProfiles from '../pages/profiles/PopularProfiles';

const NotFound = () => {
  return (
    <Row className="h-100 m-0">
        <Col className={`py-2 p-0 ${appStyles.Content}`} md={11} xl={7}>
            <PopularProfiles mobile />
            <Asset 
                src={NoResults} 
                message="Sorry, the page you're looking for does not exist." 
            />
        </Col>
        <Col xl={4} className="d-none d-xl-block pt-2">
            <PopularProfiles />
        </Col>
    </Row>
  )
}

export default NotFound;