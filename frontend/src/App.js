// import logo from './logo.svg';
// import "./App.css";
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import Homescreen from './screens/Homescreen';

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Homescreen />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
