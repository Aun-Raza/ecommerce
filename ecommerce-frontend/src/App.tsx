import './App.css';
import CategorySelection from './components/pages/home/CategorySelection';
import Header from './components/layouts/Header';
import Navbar from './components/layouts/Navbar';
import ProductList from './components/pages/home/ProductList';

function App() {
  return (
    <div>
      <Navbar />
      <Header />
      <main className='container mx-auto flex gap-3 mt-3'>
        <CategorySelection />
        <ProductList />
      </main>
    </div>
  );
}

export default App;
