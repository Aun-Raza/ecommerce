import { useEffect, useState } from 'react';
import { retrieveAllOrders } from '../../../api/order-api';
import { OrderType } from '../../../api/types/order';
import { Link } from 'react-router-dom';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@nextui-org/react';

const OrderList = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const token = localStorage.getItem('token') as string;
  useEffect(() => {
    async function init() {
      const data = (await retrieveAllOrders(token)) as OrderType[];
      console.log(data.reverse());
      setOrders(data);
    }
    init();
  }, []);
  return (
    <section>
      <h2>Order History</h2>
      <Table isStriped className='w-fit mt-4'>
        <TableHeader>
          <TableColumn>Id</TableColumn>
          <TableColumn>Total</TableColumn>
          <TableColumn>Order</TableColumn>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Link to={`/orders/${order.id}`}>
                  <Button color='primary' variant='bordered'>
                    View Order
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default OrderList;
