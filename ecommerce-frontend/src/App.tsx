import './App.css';
import Navbar from './components/layouts/Navbar';
import { Route, Switch } from 'react-router-dom';
import Home from './components/pages/home';
import Error from './components/pages/error';
import ProductForm from './components/pages/forms/ProductForm';

function App() {
  return (
    <div>
      <Navbar />
      <main className='container mx-auto'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/add-product'>
            <ProductForm operation='add' />
          </Route>
          <Route exact path='/modify-product/:id'>
            <ProductForm operation='modify' />
          </Route>
          <Route path='*' component={Error} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
