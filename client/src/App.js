import { Route } from 'react-router-dom'

import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import Home from './components/Home'

function App() {
  return (
    <>
      <Header />
      <div className="container container-fluid">
      <Route exact path="/" component={Home} />
      <Footer />
      </div>
    </>
  );
}

export default App;