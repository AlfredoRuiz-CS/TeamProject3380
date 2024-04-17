import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useUserStore from '@/components/store';

import { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type productOrder = {
  productID: string;
  productName: string;
  quantity: number;
  unitPrice: string;
  totalAmount: number;
};

type Order = {
  orderID: number;
  orderDate: string;
  paymentMethod: string;
  total: number;
  items: productOrder[];
};

const Orders = () => {
  const user = useUserStore();
  const navigate = useNavigate();
  // ? Selections for the order sheet
  const [selectedOrder, setSelectedOrder] = useState<number>(0);
  const [sheetOpen, setSheetOpen] = useState(false);
  // ! SET THIS TO THE BACKEND API CALL FOR PAST ORDERS
  const [orders, setOrders] = useState<Order[]>([]);
  const [sortedOrders, setSortedOrders] = useState<Order[]>(orders);
  // ? Sorting Options
  let [sortOrder, setSortOrder] = useState('Order Desc.');
  // ? Search Query TO BE IMPLEMENTED USING BACKEND CALL
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);
  let [filterOption, setFilterOption] = useState('All');
  const orderToDisplay = sortedOrders.find(
    (order) => order.orderID === selectedOrder
  );

  useEffect(() => {}, [sheetOpen]);

  // ? Order Selection and Sheet Handlers
  function orderSelectHandler(order: number) {
    console.log('Order selected: ', order);
    sheetOpenHandler(order);
  }

  function sheetOpenHandler(order: number) {
    console.log('Sheet Opened for order: ', order);
    setSelectedOrder(order);
    setSheetOpen(!sheetOpen);
  }

  function sheetCloseHandler() {
    console.log('Sheet Closed');
    setSheetOpen(!sheetOpen);
  }

  // ? Order Sorting Handlers
  useEffect(() => {
    const sorted = sortOrders(orders);
    const filtered = filterOrders(sorted);
    setSortedOrders(sorted);
    setFilteredOrders(filtered);
    // setSortedOrders(sortOrders(orders));
    // console.log('Sort Order: ', sortOrder);
    // setFilteredOrders(filterOrders(filteredOrders));
    // let processedOrders = [...orders];
    // processedOrders = filterOrders(processedOrders);
    // processedOrders = sortOrders(processedOrders);
    // setDisplayOrders(processedOrders);
  }, [sortOrder, filterOption, orders]);

  function sortOrders(o: Order[]) {
    switch (sortOrder) {
      case 'Order Desc.':
        return o.sort((a, b) => b.orderID - a.orderID);
      case 'Order Asc.':
        return o.sort((a, b) => a.orderID - b.orderID);
      case 'Date Desc.':
        return o.sort(
          (a, b) => Date.parse(b.orderDate) - Date.parse(a.orderDate)
        );
      case 'Date Asc.':
        return o.sort(
          (a, b) => Date.parse(a.orderDate) - Date.parse(b.orderDate)
        );
      case 'Payment Method':
        // Function to group orders by a payment method
        return Object.values(
          o.reduce(
            (acc, order) => {
              const key = order.paymentMethod;
              if (!acc[key]) {
                acc[key] = [];
              }
              acc[key].push(order);
              return acc;
            },
            {} as Record<string, Order[]>
          )
        ).flat();

      case 'Total Paid Desc.':
        return o.sort((a, b) => a.total - b.total);
      case 'Total Paid Asc.':
        return o.sort((a, b) => b.total - a.total);
      default:
        return o;
    }
  }

  function filterOrders(orders: Order[]) {
    switch (filterOption) {
      case 'Last 6 Months':
        return orders.filter((order) => {
          const orderDate = new Date(order.orderDate);
          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
          return orderDate >= sixMonthsAgo;
        });
      case 'Last 2 Weeks':
        return orders.filter((order) => {
          const orderDate = new Date(order.orderDate);
          const twoWeeksAgo = new Date();
          twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
          return orderDate >= twoWeeksAgo;
        });
      case 'Payment Method':
        // Assuming a selectedPaymentMethod state is used to store the selected payment method
        return orders.filter((order) => order.paymentMethod);
      case 'Total Paid > 100':
        return orders.filter((order) => order.total > 100);
      case 'Total Paid > 250':
        return orders.filter((order) => order.total > 250);
      default:
        return orders;
    }
  }

  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(
            'https://shastamart-api-deploy.vercel.app/api/users/verifySession',
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log(response.data);
        } catch (error) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } else {
        navigate('/register');
      }
    };
    verifySession();
  }, [navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user.isAdmin) {
        try {
          const response = await axios.get(
            'https://shastamart-api-deploy.vercel.app/api/orders/allOrders'
          );
          const orderData = await response.data;
          console.log(orderData);
          const transformedOrders = orderData.map((order: Order) => ({
            orderID: order.orderID,
            orderDate: order.orderDate
              ? new Date(order.orderDate).toLocaleDateString()
              : 'N/A', // Handle invalid or null dates
            paymentMethod: order.paymentMethod || 'N/A', // Handle null payment methods
            total: order.total,
            items: order.items.map((item: productOrder) => ({
              productID: item.productID,
              productName: item.productName,
              unitPrice: item.unitPrice,
              quantity: item.quantity,
              totalAmount: item.totalAmount,
            })),
          }));
          setOrders(transformedOrders);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(
            'https://shastamart-api-deploy.vercel.app/api/orders/findAllWithEmail',
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const orderData = await response.data;
          console.log(orderData);
          const transformedOrders = orderData.map((order: Order) => ({
            orderID: order.orderID,
            orderDate: new Date(order.orderDate).toLocaleDateString(),
            paymentMethod: order.paymentMethod,
            total: order.total,
            items: order.items.map((item: productOrder) => ({
              productID: item.productID,
              productName: item.productName,
              unitPrice: item.unitPrice,
              quantity: item.quantity,
              totalAmount: item.totalAmount,
            })),
          }));
          setOrders(transformedOrders);
          console.log(orders);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchOrders();
  }, [setOrders]);

  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-bgwhite font-inter text-black">
        <Header color="blue" />
        <div className="flex w-screen flex-col">
          <h1 className="ml-16 pt-14 font-inter text-5xl font-medium text-black">
            Order History
          </h1>
          {/* Sorting Funcitonality */}
          <div className="mt-5 flex gap-2 place-self-start pb-5">
            <h3 className="ml-6 items-center place-self-center font-inter text-lg font-medium">
              Category:{' '}
            </h3>
            {/* Sort dropdown */}
            <Select
              defaultValue="Order Number"
              onValueChange={(e) => setSortOrder(e)}>
              <SelectTrigger className="h-10 w-[8rem] bg-white text-black">
                <SelectValue placeholder="Order Desc.">{sortOrder}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Order Desc.">Order Desc.</SelectItem>
                <SelectItem value="Order Asc.">Order Asc.</SelectItem>
                <SelectItem value="Date Desc.">Date Desc.</SelectItem>
                <SelectItem value="Date Asc.">Date Asc.</SelectItem>
                <SelectItem value="Payment Method">Payment Method</SelectItem>
                <SelectItem value="Total Paid Desc.">
                  Total Paid Desc.
                </SelectItem>
                <SelectItem value="Total Paid Asc.">Total Paid Asc.</SelectItem>
              </SelectContent>
            </Select>

            <Select
              defaultValue="Order Number"
              onValueChange={(e) => setFilterOption(e)}>
              <SelectTrigger className="h-10 w-[8rem] bg-white text-black">
                <SelectValue placeholder="All">{filterOption}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Last 6 Months">Last 6 Months</SelectItem>
                <SelectItem value="Last 2 Weeks">Last 2 Weeks</SelectItem>
                <SelectItem value="Total Paid > 100">
                  Total Paid {'>'} 100
                </SelectItem>
                <SelectItem value="Total Paid > 250">
                  Total Paid {'>'} 250
                </SelectItem>
                <SelectItem value="Payment Method">Payment Method</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table className="max-w-screen ml-0 rounded-lg bg-gray-50">
            <TableHeader>
              <TableRow>
                <TableHead className="max-w-6 pl-6 text-gray-700">
                  Order Number
                </TableHead>
                <TableHead className="max-w-5 text-gray-700">Date</TableHead>
                <TableHead className="max-w-5 text-gray-700">
                  Payment Method
                </TableHead>
                <TableHead className="max-w-5 text-gray-700">
                  Total Paid
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredOrders.map((order, index) => (
                <TableRow
                  key={index}
                  onClick={() => orderSelectHandler(order.orderID)}>
                  <TableCell className="max-w-6 pl-6">
                    {order.orderID}
                  </TableCell>
                  <TableCell className="max-w-6">{order.orderDate}</TableCell>
                  <TableCell className="max-w-6">
                    {order.paymentMethod}
                  </TableCell>
                  <TableCell className="max-w-6">
                    {order.total.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {sheetOpen ? (
            <div>
              <Sheet defaultOpen={true} onOpenChange={sheetCloseHandler}>
                <SheetContent side="right" className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Order #{selectedOrder}</SheetTitle>
                    <SheetDescription asChild>
                      <Table className="max-w-screen ml-0 rounded-lg bg-gray-50">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="max-w-6 pl-6 text-gray-700">
                              Product
                            </TableHead>
                            <TableHead className="max-w-5 text-gray-700">
                              Quantity
                            </TableHead>
                            <TableHead className="max-w-5 text-gray-700">
                              Price
                            </TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          {orderToDisplay &&
                            orderToDisplay.items.map((product, index) => (
                              <TableRow key={index}>
                                <TableCell className="max-w-6 pl-6">
                                  {product.productName}
                                </TableCell>
                                <TableCell className="max-w-5">
                                  {product.quantity}
                                </TableCell>
                                <TableCell className="max-w-5">
                                  {product.totalAmount.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                  })}
                                </TableCell>
                              </TableRow>
                            ))}
                          <TableRow>
                            <TableCell className="max-w-6 pl-6">
                              Total
                            </TableCell>
                            <TableCell
                              className=" max-w-9 p-0 pr-9 text-right"
                              colSpan={2}>
                              {/* TODO: Make sure that the total amount lines up with the rest of the products if the decimal place changes. */}
                              {orderToDisplay?.total.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                              })}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Orders;
