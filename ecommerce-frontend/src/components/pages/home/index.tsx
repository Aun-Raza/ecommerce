import { useState } from 'react';
import CategorySelection from './sections/CategorySelection';
import ProductList from './sections/ProductList';
import { Link } from 'react-router-dom';
import Header from './sections/Header';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <Header />
      <button className='my-3 primary'>
        <Link to='add-product'>Add Product</Link>
      </button>
      <div className='flex gap-3'>
        <CategorySelection
          onCategoryChange={(category: string) =>
            setSelectedCategory(category ? category : null)
          }
        />
        <ProductList category={selectedCategory} />
      </div>
    </>
  );
};

export default Home;
