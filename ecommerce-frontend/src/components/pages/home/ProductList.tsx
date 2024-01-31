import { useEffect, useState } from 'react';
import { ProductType } from '../../../api/types';
import { retrieveAllProducts } from '../../../api';

const ProductList = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    async function init() {
      const data = await retrieveAllProducts(null);
      setProducts(data);
    }
    init();
  }, []);
  return (
    <ul className='w-3/4 grid grid-cols-3 gap-2'>
      {products.map(({ name, description, price }) => (
        <li className='h-32 border p-2'>
          <h3>{name}</h3>
          <p>{description}</p>
          <p>Price ${price.toFixed(2)}</p>
          <button>Add to Cart</button>
          <p>Stock: 100</p>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
