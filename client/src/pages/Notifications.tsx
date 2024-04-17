import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useState, useEffect } from 'react';
import axios from 'axios';

function handleStockOrder() {
  console.log('Notification Selected');
}

function notificationSelectHandler() {
  console.log('Notification Selected');
}

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          'https://shastamart-api-deploy.vercel.app/api/notifications/get_notifications'
        );
        const notifData = await response.data;

        const uniqueMessages: any = {};
        const filteredData: any = [];
        notifData.forEach((item: any) => {
          if (!uniqueMessages[item.message]) {
            uniqueMessages[item.message] = true;
            item.message = item.message.replace(`Product ID ${item.productID}`, item.productName);
            filteredData.push(item);
          }
        });
        console.log(filteredData);
        setNotifications(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-bgwhite font-inter text-black">
        <Header color="blue" />
        <div className="flex w-1/2 flex-col self-center">
          <h1 className=" pb-5 pt-14 font-inter text-5xl font-medium text-black">
            Admin Notifications
          </h1>
          {/* Sorting Funcitonality */}

          <Table className="ml-0 rounded-lg bg-gray-50">
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6  text-gray-700">
                  Product Name
                </TableHead>
                <TableHead className="text-center text-gray-700">
                  Notification Message
                </TableHead>
                <TableHead className=" text-gray-700">
                  Order Additional Stock?
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {notifications.map((notification: any, index) => (
                <TableRow key={index} onClick={() => notificationSelectHandler}>
                  <TableCell className="pl-16 ">
                    {notification.productName}
                  </TableCell>
                  <TableCell className="text-center">
                    {notification.message}
                  </TableCell>
                  <TableCell className="pl-12">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Order</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <form onSubmit={handleStockOrder}>
                          <DialogHeader>
                            <DialogTitle className="text-3xl">
                              Order Stock
                            </DialogTitle>
                            <DialogDescription className="text-lg">
                              {'Enter Quantity of ' +
                                notification.notificationID +
                                ' below to submit order.'}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Product Name
                              </Label>
                              <Input
                                id="productName"
                                name="productName"
                                placeholder="e.g. Fresh Strawberries"
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="quantity" className="text-right">
                                Quantity
                              </Label>
                              <Input
                                id="quantity"
                                name="quantity"
                                placeholder="e.g. 10"
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button type="submit">Submit Order</Button>
                            </DialogClose>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Notifications;
