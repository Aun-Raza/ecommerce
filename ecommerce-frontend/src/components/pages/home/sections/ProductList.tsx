import { useEffect, useState } from 'react';
import {
  CartProductWithProductIdType,
  ProductType,
} from '../../../../api/types';
import {
  deleteProduct,
  retrieveAllProducts,
} from '../../../../api/products-api';
import { Link } from 'react-router-dom';
import { createCartProduct } from '../../../../api/cart-api';

type ProductListProps = {
  category: string | null;
};

const ProductList = ({ category }: ProductListProps) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const token = localStorage.getItem('token') as string;
  useEffect(() => {
    async function init() {
      const data = await retrieveAllProducts(null);
      setProducts(data);
    }
    init();
  }, []);

  async function handleProductDelete(productId: number) {
    await deleteProduct(productId.toString(), token);
    const filteredProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(filteredProducts);
  }

  async function handleAddProductToCart(product: ProductType) {
    const body: CartProductWithProductIdType = {
      cartProduct: {
        price: product.price,
        quantity: 1,
      },
      productId: product.id,
    };
    await createCartProduct(body, token);
  }

  function renderProducts(products: ProductType[]) {
    return products.map((product) => (
      <li key={product.id} className='h-fit border p-2'>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Price ${product.price.toFixed(2)}</p>
        <div className='flex flex-col gap-2 mt-2'>
          <button
            className='primary w-full'
            onClick={() => handleAddProductToCart(product)}
          >
            Add to Cart
          </button>
          <div className='flex gap-2'>
            <button className='warning w-full'>
              <Link to={`/modify-product/${product.id}`}>Modify</Link>
            </button>
            <button
              className='danger w-full'
              onClick={() => handleProductDelete(product.id)}
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
