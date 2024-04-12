import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { productItem } from '@/components/store';
import { dummyProducts } from './Products';

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

type Order = {
  orderNumber: number;
  date: string;
  paymentMethod: string;
  total: number;
  items: productItem[];
};

const dummyOrders: Order[] = Array(20)
  .fill({ items: [] })
  .map((_, index) => ({
    orderNumber: index,
    date: new Date().toDateString(),
    paymentMethod: 'Credit Card',
    total: 100,
    items: dummyProducts.slice(0, 10),
  }));

const Orders = () => {
  // ? Selections for the order sheet
  const [selectedOrder, setSelectedOrder] = useState<number>(0);
  const [sheetOpen, setSheetOpen] = useState(false);
  // ! SET THIS TO THE BACKEND API CALL FOR PAST ORDERS
  const orders = dummyOrders;
  const [sortedOrders, setSortedOrders] = useState<Order[]>(dummyOrders);
  // ? Sorting Options
  let [sortOrder, setSortOrder] = useState('Order Desc.');
  // ? Search Query TO BE IMPLEMENTED USING BACKEND CALL
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(dummyOrders);
  let [filterOption, setFilterOption] = useState('Payment Method');

  // let [searchQuery, setSearchQuery] = useState('');
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
    setSortedOrders(sortOrders(orders));
    console.log('Sort Order: ', sortOrder);
  }, [sortOrder]);

  useEffect(() => {
    setFilteredOrders(filterOrders(filteredOrders));
    console.log('Filter Order: ', filterOption);
  }, [filterOption]);

  function sortOrders(o: Order[]) {
    switch (sortOrder) {
      case 'Order Desc.':
        return o.sort((a, b) => b.orderNumber - a.orderNumber);
      case 'Order Asc.':
        return o.sort((a, b) => a.orderNumber - b.orderNumber);
      case 'Date Desc.':
        return o.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
      case 'Date Asc.':
        return o.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
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
        return o.sort((a, b) => b.total - a.total);
      case 'Total Paid Asc.':
        return o.sort((a, b) => a.total - b.total);
      default:
        return o;
    }
  }

  function filterOrders(orders: Order[]) {
    switch (filterOption) {
      case 'Last 6 Months':
        return orders.filter(order => {
          const orderDate = new Date(order.date);
          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
          return orderDate >= sixMonthsAgo;
        });
      case 'Last 2 Weeks':
        return orders.filter(order => {
          const orderDate = new Date(order.date);
          const twoWeeksAgo = new Date();
          twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
          return orderDate >= twoWeeksAgo;
        });
      case 'Payment Method':
        // Assuming a selectedPaymentMethod state is used to store the selected payment method
        return orders.filter(order => order.paymentMethod);
      case 'Total Paid > 100':
        return orders.filter(order => order.total > 100);
      case 'Total Paid > 250':
        return orders.filter(order => order.total > 250);
      default:
        return orders;
    }
  }


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
              onValueChange={(e) => setSortOrder(e)}
            >
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
              {sortedOrders.map((order, index) => (
                <TableRow
                  key={index}
                  onClick={() => orderSelectHandler(order.orderNumber)}
                >
                  <TableCell className="max-w-6 pl-6">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell className="max-w-6">{order.date}</TableCell>
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
                          {sortedOrders[selectedOrder].items.map(
                            (product, index) => (
                              <TableRow key={index}>
                                <TableCell className="max-w-6 pl-6">
                                  {product.name}
                                </TableCell>
                                <TableCell className="max-w-5">1</TableCell>
                                <TableCell className="max-w-5">
                                  {product.price.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                  })}
                                </TableCell>
                              </TableRow>
                            )
                          )}
                          <TableRow>
                            <TableCell className="max-w-6 pl-6">
                              Total
                            </TableCell>
                            <TableCell
                              className=" max-w-9 p-0 pr-9 text-right"
                              colSpan={2}
                            >
                              {/* TODO: Make sure that the total amount lines up with the rest of the products if the decimal place changes. */}
                              {sortedOrders[selectedOrder].total.toLocaleString(
                                'en-US',
                                {
                                  style: 'currency',
                                  currency: 'USD',
                                }
                              )}
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
