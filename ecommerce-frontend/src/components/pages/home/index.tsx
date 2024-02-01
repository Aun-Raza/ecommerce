import { useState } from 'react';
import CategorySelection from './sections/CategorySelection';
import ProductList from './sections/ProductList';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <button className='my-3 primary'>Add Product</button>
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
