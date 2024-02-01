import './App.css';
import Header from './components/layouts/Header';
import Navbar from './components/layouts/Navbar';
import { Route, Switch } from 'react-router-dom';
import Home from './components/pages/home';
import Error from './components/pages/error';

function App() {
  return (
    <div>
      <Navbar />
      <Header />
      <main className='container mx-auto'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='*' component={Error} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
