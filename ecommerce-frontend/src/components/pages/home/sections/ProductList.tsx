import { useEffect, useState } from 'react';
import { ProductType } from '../../../../api/types';
import { deleteProduct, retrieveAllProducts } from '../../../../api';
import { Link } from 'react-router-dom';

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

  async function handleProductDelete(productId: number) {
    await deleteProduct(productId.toString());
    const filteredProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(filteredProducts);
  }

  function renderProducts(products: ProductType[]) {
    return products.map(({ id, name, description, price }) => (
      <li key={id} className='h-fit border p-2'>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>Price ${price.toFixed(2)}</p>
        <div className='flex flex-col gap-2 mt-2'>
          <button className='primary w-full'>Add to Cart</button>
          <div className='flex gap-2'>
            <button className='warning w-full'>
              <Link to={`/modify-product/${id}`}>Modify</Link>
            </button>
            <button
              className='danger w-full'
              onClick={() => handleProductDelete(id)}
            >
              Delete
            </button>
          </div>
        </div>
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
