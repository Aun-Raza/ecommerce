import { useState } from 'react';
import CategorySelection from './sections/CategorySelection';
import ProductList from './sections/ProductList';
import { Link } from 'react-router-dom';
import Header from './sections/Header';
import { Button } from '@nextui-org/react';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <Header />
      <section>
        <Button color='primary' className='my-2'>
          <Link to='add-product'>Add Product</Link>
        </Button>
        <div className='flex flex-col sm:flex-row gap-3'>
          <CategorySelection
            selectedCategory={selectedCategory}
            onCategoryChange={(category: string) =>
              setSelectedCategory(category ? category : null)
            }
          />
          <ProductList category={selectedCategory} />
        </div>
      </section>
    </>
  );
};

export default Home;
