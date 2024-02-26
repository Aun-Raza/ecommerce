import { useEffect, useState } from 'react';
import { checkoutCart, retrieveCartProducts } from '../../../api/cart-api';
import { CartType, defaultCart } from '../../../api/types/cart';
import { Button, Image } from '@nextui-org/react';
import { useHistory } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState<CartType>(defaultCart);
  const token = localStorage.getItem('token') as string;
  const history = useHistory();
  useEffect(() => {
    async function init() {
      const data = (await retrieveCartProducts(token)) as CartType;
      setCart(data);
    }
    init();
  }, []);

  async function checkout() {
    // console.log(cart);
    if (!cart.products) return;
    const emptyCart = (await checkoutCart(token)) as CartType;
    console.log(emptyCart);
    setCart(emptyCart);
    history.push('/orders');
  }

  return (
    <section>
      <h2>
        Cart <span className='text-2xl'>(4 items)</span>
      </h2>
      <div className='mt-4 flex flex-col md:flex-row gap-3'>
        <div className='w-7/12 border rounded-lg px-4 py-6 shadow-lg'>
          {cart && cart.products.length === 0
            ? 'Empty Cart'
            : cart.products.map((productItem) => (
                <div
                  className='p-2 flex gap-2 [&:not(:first-of-type)]:border-t-1'
                  key={cart.id + productItem.id}
                >
                  <div>
                    <Image
                      className='w-36 h-36 object-contain'
                      src={productItem.product.imageUrl}
                      alt={'image of ' + productItem.product.name}
                    />
                  </div>
                  <div className='mt-5 flex flex-col gap-1'>
                    <p>{productItem.product.name}</p>
                    <span className='block text-sm'>
                      ${productItem.product.price}/each
                    </span>
                    <span className='block text-sm'>
                      Quantity: {productItem.quantity}
                    </span>
                    <span className='block text-sm'>
                      Total: ${productItem.price}
                    </span>
                  </div>
                </div>
              ))}
        </div>
        {cart && (
          <div className='w-5/12 h-fit border rounded-lg px-4 py-6 flex flex-col gap-3 shadow-lg'>
            <Button color='primary' onClick={checkout}>
              Continue to Checkout
            </Button>
            <div className='px-3 flex flex-col gap-2'>
              <div className='flex'>
                <p className='w-48 font-bold'>
                  Subtotal{' '}
                  <span className='text-sm font-normal'>(4 items)</span>
                </p>
                <p>${cart.subtotal.toFixed(2)}</p>
              </div>
              <div className='flex'>
                <p className='w-48 font-bold'>Discount</p>
                <p>-${(cart.subtotal / 2).toFixed(2)}</p>
              </div>
              <div className='flex'>
                <p className='w-48 font-bold'>
                  Taxes <span className='text-sm font-normal'>(13%)</span>
                </p>
                <p>${cart.tax.toFixed(2)}</p>
              </div>
              <div className='flex'>
                <p className='w-48 font-bold'>Total</p>
                <p>${cart.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
