import styles from  './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';

import NavBar from './components/NavBar';
import LeftPanel from './components/LeftPanel';

import SignUpForm from './pages/auth/SignUpForm';
import LogInForm from './pages/auth/LogInForm';

function App() {
  return (
    <div className={styles.App}>
      {/* NavBar */}
      <NavBar />
      <Row className={`px-0 mx-0 ${styles.Main}`}>
        {/* LeftPanel */}
        <Col className={`px-0 ${styles.LeftPanel}`} md={3}>
          <LeftPanel />
        </Col>
        {/* Main content */}
        <Col className="px-0 offset-3" md={9}>
          <Switch>
            <Route exact path="/" render={()=> <h1>Home</h1>} />
            <Route exact path="/login" render={()=> <LogInForm />} />
            <Route exact path="/signup" render={()=> <SignUpForm />} />
            <Route render={()=> <h1>Page not found.</h1>} />
          </Switch>
        </Col>
      </Row>
    </div>
  );
}

export default App;