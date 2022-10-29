import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import appStyles from '../../App.module.css';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import { axiosReq } from '../../api/axiosDefaults';
import Recommendation from './Recommendation';
import CommentCreateForm from '../comments/CommentCreateForm';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Asset from '../../components/Asset';
import { fetchMoreData } from '../../utils/utils';
import Comment from '../comments/Comment';

/**
 * Renders the RecommendationPage - which is a detailed page of an individual Recommendation.
 * The variables and logic have been created using the Moments walkthrough
 * and have been built upon/customised.
 */
function RecommendationPage() {
  const { id } = useParams();
  const [recommendation, setRecommendation] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: recommendation }, { data: comments }] = await Promise.all([
          axiosReq.get(`/recommendations/${id}`),
          axiosReq.get(`/comments/?recommendation=${id}`),
        ]);
        setRecommendation({ results: [recommendation] });
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100 m-0">
      <Col className="py-2 p-0" lg={11}>
        <Recommendation 
          {...recommendation.results[0]} 
          setRecommendations={setRecommendation}
        />
        <Container fluid className={`mb-4 ${appStyles.Content} ${appStyles.FlatBoxBorder}`}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              recommendation={id}
              setItem={setRecommendation}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {comments.results.length ? (
            <InfiniteScroll
              children={comments.results.map(comment => (
                <Comment 
                  key={comment.id} {...comment} 
                  setItem={setRecommendation} 
                  setComments={setComments}
                />
              ))}
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            />
          ) : currentUser ? (
            <span>No comments yet - be the first to comment!</span>
          ) : (
            <span>No comments yet.</span>
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default RecommendationPage;