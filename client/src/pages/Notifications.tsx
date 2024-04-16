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

import { useState, useEffect } from 'react';
import axios from 'axios';

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
                    {notification.notificationID}
                  </TableCell>
                  <TableCell className="text-center">
                    {notification.message}
                  </TableCell>
                  <TableCell className="pl-12">
                    <Button>Order</Button>
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
