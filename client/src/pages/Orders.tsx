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

type Order = {
  orderNumber: number;
  date: string;
  paymentMethod: string;
  total: number;
  items: productItem[];
};

interface OrdersProps {
  orders: Order[];
}

const dummyOrders: Order[] = Array(10)
  .fill({ items: [] })
  .map((_, index) => ({
    orderNumber: index,
    date: new Date().toDateString(),
    paymentMethod: 'Credit Card',
    total: 100,
    items: dummyProducts,
  }));

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState<number>(0);
  const [sheetOpen, setSheetOpen] = useState(false);
  useEffect(() => {}, [sheetOpen]);

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
  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-bgwhite font-inter text-black">
        <Header color="blue" />
        <div className="flex w-screen flex-col gap-10">
          <h1 className="ml-16 pt-14 font-inter text-5xl font-medium text-black">
            Order History
          </h1>
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
              {dummyOrders.map((order, index) => (
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
                <SheetContent side="right">
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
                          {dummyOrders[selectedOrder].items.map(
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
                              {dummyOrders[selectedOrder].total.toLocaleString(
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
            <div></div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Orders;
