import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import {Container} from 'react-bootstrap';
import HomeScreen from './screens/HameScreen/HomeScreen';
import ProductsScreen from './screens/ProductsScreen/ProductsScreen';
import CartScreen from './screens/CartScreen/CartScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';

function App() {
  return (

    <Router>
    <Header/>
    <main className='py-3'>
      <Container>
      <Route path='/login'>
          <LoginScreen/>
        </Route>
        <Route path='/register'>
          <RegisterScreen/>
        </Route>
        <Route path='/product/:id'>
          <ProductsScreen/>
        </Route>
        <Route path='/cart/:id?'>
          <CartScreen/>
        </Route>
        <Route exact path='/'>
        <HomeScreen/>
        </Route>
      </Container>
    </main>
      <Footer/>

    </Router>
  );
}

export default App;
