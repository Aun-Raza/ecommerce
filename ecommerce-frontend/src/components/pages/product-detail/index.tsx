import React, { useEffect, useState } from 'react';
import { ProductType } from '../../../api/types/product';
import { retrieveProduct } from '../../../api/products-api';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Button, Image } from '@nextui-org/react';
import { CartProductWithProductIdDtoType } from '../../../api/types/cart';
import { createCartProduct } from '../../../api/cart-api';
import { isTokenExpired } from '../../../util/func';
import { defaultUser, useAuthContext } from '../../../context/AuthContext';

const ProductDetail = () => {
  const [product, setProduct] = useState<ProductType>();
  const { id: productId } = useParams<{ id: string }>();
  const history = useHistory();
  const token = localStorage.getItem('token') as string;
  const { setUser } = useAuthContext();

  useEffect(() => {
    async function init() {
      if (!productId) history.push('/');
      const product = (await retrieveProduct(productId)) as ProductType;
      setProduct(product);
    }
    init();
  }, []);

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

  return (
    <section>
      {product && (
        <div className='flex flex-col md:flex-row gap-3'>
          <div className='w-7/12'>
            <Image
              className='h-unit-9xl'
              src={product.imageUrl}
              alt={'image of ' + product.name}
            />
          </div>
          <div className='w-5/12 border rounded-lg px-4 py-6 flex flex-col gap-3 shadow-lg'>
            <h2>{product.name}</h2>
            <span className='w-fit border-2 text-secondary-400 border-secondary-400 p-2 rounded-lg'>
              {product.category.name}
            </span>
            <p className='grow leading-8'>
              {product.description} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Eius voluptate delectus saepe minima qui
              consequuntur ut provident vitae enim, culpa similique blanditiis
              neque animi fuga laudantium aliquid molestiae dicta architecto!
            </p>
            <p className='text-2xl'>
              Price ${product.price.toFixed(2)}{' '}
              <span className='line-through'>
                ${(product.price * 2).toFixed(2)}
              </span>
            </p>
            <Button
              color='primary'
              variant='bordered'
              className='w-full'
              onClick={() => handleAddProductToCart(product)}
            >
              Add to Cart
            </Button>
            <Link to='/'>
              <Button color='secondary' variant='flat' className='w-full'>
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
