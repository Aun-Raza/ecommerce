import { useEffect, useState } from 'react';
import { retrieveCartProducts } from '../../../api/cart-api';
import { useAuthContext } from '../../../context/AuthContext';
import { CartType, defaultCart } from '../../../api/types/cart';

const Cart = () => {
  const [cart, setCart] = useState<CartType>(defaultCart);
  const token = localStorage.getItem('token') as string;
  useEffect(() => {
    async function init() {
      const data = (await retrieveCartProducts(token)) as CartType;
      setCart(data);
    }
    init();
  }, []);
  return (
    <>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg my-4'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Id
              </th>
              <th scope='col' className='px-6 py-3'>
                Product
              </th>
              <th scope='col' className='px-6 py-3'>
                Price
              </th>
              <th scope='col' className='px-6 py-3'>
                Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((productCart) => (
              <tr
                key={productCart.id}
                className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'
              >
                <th
                  scope='row'
                  className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {productCart.id}
                </th>
                <td className='px-6 py-4'>{productCart.product.name}</td>
                <td className='px-6 py-4'>${productCart.price}</td>
                <td className='px-6 py-4'>{productCart.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className='primary'>Checkout</button>
    </>
  );
};

export default Cart;
