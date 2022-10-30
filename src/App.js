import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';

import styles from  './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/NavBar';
import CreatePanel from './components/CreatePanel';

import SignUpForm from './pages/auth/SignUpForm';
import LogInForm from './pages/auth/LogInForm';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostEditForm from './pages/posts/PostEditForm';
import PostPage from './pages/posts/PostPage';
import PostsFeed from './pages/posts/PostsFeed';
import RecommendationCreateForm from './pages/recommendations/RecommendationCreateForm';
import RecommendationEditForm from './pages/recommendations/RecommendationEditForm';
import RecommendationPage from './pages/recommendations/RecommendationPage';
import RecommendationsFeed from './pages/recommendations/RecommendationsFeed';
import EventCreateForm from './pages/events/EventCreateForm';
import EventEditForm from './pages/events/EventEditForm';
import EventPage from './pages/events/EventPage';
import ProfilePage from './profiles/ProfilePage';
import { useCurrentUser } from "./contexts/CurrentUserContext";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      {/* NavBar */}
      <NavBar />
      <Row className="px-0 pt-md-4 mx-0">
        {/* Left CreatePanel */}
        <Col className={`px-0 d-sm-none d-md-block ${styles.LeftPanel}`} md={3}>
          <CreatePanel />
        </Col>
        {/* Middle CreatePanel */}
        <Col className={`px-0 py-3 d-sm-block d-md-none`} md={12}>
          <CreatePanel />
        </Col>
        {/* Main content */}
        <Col className="px-0 offset-md-3" sm={12} md={9}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <PostsFeed
                  message="Change your search keyword or follow a user."
                  filter={`owner__followed__owner__profile=${profile_id}&`}
                />
              )}
            />
            <Route 
              exact 
              path="/explore" 
              render={() => (
                <PostsFeed 
                  message="Change your search keyword."
                />
              )} 
            />
            <Route 
              exact 
              path="/liked" 
              render={() => (
              <PostsFeed
                message="Change search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`} 
              />
            )} 
          />
            <Route exact path="/login" render={()=> <LogInForm />} />
            <Route exact path="/signup" render={()=> <SignUpForm />} />
            <Route exact path="/posts/create" render={()=> <PostCreateForm />} />
            <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
            <Route exact path="/posts/:id" render={() => <PostPage />} />
            <Route
              exact
              path="/recommendations"
              render={() => (
                <RecommendationsFeed
                  message="Change your search keyword."
                />
              )}
            />
            <Route exact path="/recommendations/create" render={()=> <RecommendationCreateForm />} />
            <Route exact path="/recommendations/:id/edit" render={() => <RecommendationEditForm />} />
            <Route exact path="/recommendations/:id" render={() => <RecommendationPage />} />
            <Route exact path="/events/create" render={()=> <EventCreateForm />} />
            <Route exact path="/events/:id/edit" render={() => <EventEditForm />} />
            <Route exact path="/events/:id" render={() => <EventPage />} />
            <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
            <Route render={()=> <h1>Page not found.</h1>} />
          </Switch>
        </Col>
      </Row>
    </div>
  );
}

export default App;