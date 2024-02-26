import { useEffect, useState } from 'react';
import { ProductType } from '../../../../api/types/product';
import {
  deleteProduct,
  retrieveAllProducts,
} from '../../../../api/products-api';
import { Link, useHistory } from 'react-router-dom';
import { createCartProduct } from '../../../../api/cart-api';
import { CartProductWithProductIdDtoType } from '../../../../api/types/cart';
import { Button } from '@nextui-org/react';
import { isTokenExpired } from '../../../../util/func';
import { defaultUser, useAuthContext } from '../../../../context/AuthContext';

type ProductListProps = {
  category: string | null;
};

const ProductList = ({ category }: ProductListProps) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const token = localStorage.getItem('token') as string;
  const history = useHistory();
  const { setUser } = useAuthContext();
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
    if (isTokenExpired(token)) {
      setUser(defaultUser);
      localStorage.setItem('token', '');
      history.push('/login');
    }
    const body: CartProductWithProductIdDtoType = {
      price: product.price,
      quantity: 1,
      productId: product.id,
    };
    await createCartProduct(body, token);
  }

  function renderProducts(products: ProductType[]) {
    return products.map((product) => (
      <li
        key={product.id}
        onClick={() => history.push(`/products/${product.id}`)}
        className='h-fit border rounded-xl p-4 cursor-pointer shadow-lgs'
      >
        <img
          src={product.imageUrl}
          className='w-60 h-60 mx-auto object-contain'
          alt={'image of ' + product.name}
        />
        <h3>{product.name}</h3>
        <p>
          Price ${product.price.toFixed(2)}{' '}
          <span className='line-through'>
            ${(product.price * 2).toFixed(2)}
          </span>
        </p>
        <div className='flex flex-col gap-2 mt-2'>
          <Button
            color='primary'
            variant='bordered'
            className='w-full'
            onClick={() => handleAddProductToCart(product)}
          >
            Add to Cart
          </Button>
          <div className='flex flex-col md:flex-row gap-2'>
            <Button color='warning' className='w-full' variant='bordered'>
              <Link to={`/modify-product/${product.id}`}>Modify</Link>
            </Button>
            <Button
              color='danger'
              className='w-full'
              onClick={() => handleProductDelete(product.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </li>
    ));
  }

  return (
    <ul className='md:w-3/4 grid sm:grid-cols-2 xl:grid-cols-3 gap-2'>
      {renderProducts(
        category !== null
          ? products.filter((product) => product.category.name === category)
          : products
      )}
    </ul>
  );
};

export default ProductList;
