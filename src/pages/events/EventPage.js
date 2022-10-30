import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { axiosReq } from '../../api/axiosDefaults';
import Event from './Event';

/**
 * Renders the EventPage - which is a detailed page of an individual Event.
 * The variables and logic have been created using the Moments walkthrough
 * and have been built upon/customised.
 */
function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: event }] = await Promise.all([
          axiosReq.get(`/events/${id}`),
        ]);
        setEvent({ results: [event] });
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100 m-0">
      <Col className="py-2 p-0" lg={11}>
        <Event 
          {...event.results[0]} 
          setEvents={setEvent}
        />
      </Col>
    </Row>
  );
}

export default EventPage;