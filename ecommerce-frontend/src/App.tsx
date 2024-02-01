import './App.css';
import CategorySelection from './components/pages/home/CategorySelection';
import Header from './components/layouts/Header';
import Navbar from './components/layouts/Navbar';
import ProductList from './components/pages/home/ProductList';
import { useState } from 'react';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div>
      <Navbar />
      <Header />
      <main className='container mx-auto flex gap-3 mt-3'>
        <CategorySelection
          onCategoryChange={(category: string) =>
            setSelectedCategory(category ? category : null)
          }
        />
        <ProductList category={selectedCategory} />
      </main>
    </div>
  );
}

export default App;
