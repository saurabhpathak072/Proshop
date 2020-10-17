import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import {Container} from 'react-bootstrap';
import HomeScreen from './screens/HameScreen/HomeScreen';
import ProductsScreen from './screens/ProductsScreen/ProductsScreen';

function App() {
  return (

    <Router>
    <Header/>
    <main className='py-3'>
      <Container>
        <Route exact path='/'>
        <HomeScreen/>
        </Route>
        <Route path='/product/:id'>
          <ProductsScreen/>
        </Route>
      </Container>
    </main>
      <Footer/>

    </Router>
  );
}

export default App;
