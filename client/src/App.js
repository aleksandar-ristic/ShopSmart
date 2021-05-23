import { useEffect } from 'react'
import { Route } from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import Home from './components/Home'
import ProductDetails from './components/product/ProductDetails'

import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'

import ProtectedRoute from './components/route/ProtectedRoute'
import { loadUser } from './actions/userActions'
import store from './store'

function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <>
      <Header />
      <div className="container container-fluid">
      <Route exact path="/" component={Home} />
      <Route path="/search/:keyword" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />

      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />

      <ProtectedRoute exact path="/me" component={Profile} />
      <Footer />
      </div>
    </>
  );
}

export default App;
