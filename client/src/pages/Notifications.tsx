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
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useUserStore from '@/components/store';

function orderSuccessToast(productName: string, quantity: string) {
  toast.success(
    'Order for ' + quantity + ' ' + productName + ' ' + 'Submitted!',
    {
      position: 'bottom-right',
      className: 'font-bold text-black',
      duration: 2000,
    }
  );
}

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const user = useUserStore();

  async function handleStockOrder(
    event: React.FormEvent<HTMLFormElement>,
    productName: string
  ) {
    event.preventDefault();
    let quantity = (document.getElementById('quantity') as HTMLInputElement)
      .value;
  
    const data = {
      productName: productName,
      quantity: quantity,
    };
  
    try {
      const response = await axios.post(
        'https://shastamart-api-deploy.vercel.app/api/orders/insertStock',
        data
      );
      console.log(response);
      orderSuccessToast(productName, quantity);
      console.log('Order Submitted for ', productName, ' ', quantity);
      setReloadTrigger(prev => prev + 1)
    } catch (error) {
      console.log(error);
    }
    console.log('Notification Selected');
  }

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
            item.message = item.message.replace(
              `Product ID ${item.productID}`,
              item.productName
            );
            filteredData.push(item);
          }
        });
        console.log(filteredData);
        setNotifications(filteredData);
        user.setUserDetails({
          notificationsCount: filteredData.length
        })
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotifications();
  }, [reloadTrigger]);

  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-bgwhite font-inter text-black">
        <Header color="blue" />
        <div className="flex w-3/4 flex-col self-center">
          <h1 className=" pb-5 pt-14 font-inter text-5xl font-medium text-black">
            Admin Notifications
          </h1>

          {/* Sorting Funcitonality */}
          {!isLoading ?
            (notifications.length > 0 ? (<Table className="ml-0 rounded-lg bg-gray-50">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center text-gray-700">
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
                <TableRow key={index}>
                  <TableCell className="text-center">
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
                        <form
                          onSubmit={(e) =>
                            handleStockOrder(e, notification.productName)
                          }>
                          <DialogHeader>
                            <DialogTitle className="text-3xl">
                              Order Stock
                            </DialogTitle>
                            <DialogDescription className="text-lg">
                              {'Enter Quantity of ' +
                                notification.productName +
                                ' below to submit order.'}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
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
          </Table> ) 
          : (
            <div className="flex w-auto items-center justify-center text-3xl rounded-lg">
              {' '}
              No Messages
            </div>
            )
          )
          : (
              <div className="flex w-auto items-center justify-center text-3xl rounded-lg">
                Loading messages...
              </div>
            )
          }
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Notifications;
