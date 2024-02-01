import { useEffect, useState } from 'react';
import { ProductType } from '../../../api/types';
import { retrieveAllProducts } from '../../../api';

type ProductListProps = {
  category: string | null;
};

const ProductList = ({ category }: ProductListProps) => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    async function init() {
      const data = await retrieveAllProducts(null);
      setProducts(data);
    }
    init();
  }, []);

  function renderProducts(products: ProductType[]) {
    return products.map(({ id, name, description, price }) => (
      <li key={id} className='h-fit border p-2'>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>Price ${price.toFixed(2)}</p>
        <button>Add to Cart</button>
        <p>Stock: 100</p>
      </li>
    ));
  }

  return (
    <ul className='w-3/4 grid grid-cols-3 gap-2'>
      {renderProducts(
        category !== null
          ? products.filter((product) => product.category.name === category)
          : products
      )}
    </ul>
  );
};

export default ProductList;
