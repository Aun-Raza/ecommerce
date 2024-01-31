import './App.css';
import Header from './components/layouts/Header';
import Navbar from './components/layouts/Navbar';

function App() {
  const categories = ['All Categories', 'Digital Watch', 'Smart Phone', 'TV'];
  const products = [
    'iPhone 15',
    'Pixel 8',
    'Galaxy S',
    'iPad 2',
    'iWatch Series 9',
  ];
  return (
    <div>
      <Navbar />
      <Header />
      <main className='container mx-auto flex gap-3 mt-3'>
        <aside className='w-1/4 h-fit border'>
          {categories.map((category) => (
            <div className='p-3 border'>{category}</div>
          ))}
        </aside>
        <ul className='w-3/4 grid grid-cols-3 gap-2'>
          {products.map((product) => (
            <li className='h-32'>{product}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
