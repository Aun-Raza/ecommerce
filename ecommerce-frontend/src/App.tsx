import './App.css';
import Navbar from './components/layouts/Navbar';
import { Route, Switch } from 'react-router-dom';
import Home from './components/pages/home';
import Error from './components/pages/error';
import ProductForm from './components/pages/forms/ProductForm';
import AuthForm from './components/pages/forms/AuthForm';
import AuthRoute from './context/AuthRoute';
import UnprotectedRoute from './context/UnprotectedRoute';
import Cart from './components/pages/cart/Cart';
import OrderList from './components/pages/orders';
import OrderDetail from './components/pages/orders/order';

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Switch>
          <Route exact path='/'>
            <UnprotectedRoute isAuth={false}>
              <Home />
            </UnprotectedRoute>
          </Route>
          <Route exact path='/login'>
            <UnprotectedRoute isAuth={true}>
              <AuthForm type='login' />
            </UnprotectedRoute>
          </Route>
          <Route exact path='/register'>
            <UnprotectedRoute isAuth={true}>
              <AuthForm type='register' />
            </UnprotectedRoute>
          </Route>
          <Route exact path='/add-product'>
            <AuthRoute>
              <ProductForm operation='add' />
            </AuthRoute>
          </Route>
          <Route exact path='/modify-product/:id'>
            <AuthRoute>
              <ProductForm operation='modify' />
            </AuthRoute>
          </Route>
          <Route exact path='/cart'>
            <AuthRoute>
              <Cart />
            </AuthRoute>
          </Route>
          <Route exact path='/orders'>
            <AuthRoute>
              <OrderList />
            </AuthRoute>
          </Route>
          <Route exact path='/orders/:id'>
            <AuthRoute>
              <OrderDetail />
            </AuthRoute>
          </Route>
          <Route path='*' component={Error} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
