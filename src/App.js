import styles from  './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <h1>Home</h1>
        <h1>Log in</h1>
        <h1>Create account</h1>
      </Container>
    </div>
  );
}

export default App;