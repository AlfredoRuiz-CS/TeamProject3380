import { useState } from 'react'; // Import React and useState
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect } from 'react'; // Remove useState import
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

// import {
//     Sheet,
//     SheetContent,
//     SheetDescription,
//     SheetHeader,
//     SheetTitle,
// } from '@/components/ui/sheet';

type shippingData = {
    shippingID?: number;
    customerEmail?: string;
    orderID?: number;
    paymentID?: number;
    cost?: number;
    trackingNum?: string;
    estimatedDel: string;
    shippingStatus?: string;
    streetAddress?: string;
    city?: string;
    state?: string;
    zipcode?: string;
}

export const ShippingInformation = () => {
    // const [sheetOpen, setSheetOpen] = useState(false); // State for sheet open/close
    // const [selectedOrder, setSelectedOrder] = useState(''); // State for selected order
    const [shippingInfo, setShippingInfo] = useState<shippingData[]>([]);

    // const shippingData = [
    //     // Sample shipping data
    //     {
    //         id: 12345,
    //         email: 'test@gmail.com',
    //         cost: 50,
    //         date: '2024-04-15',
    //         address: '123 Main St',
    //         city: 'City',
    //         state: 'State',
    //         zipcode: '12345',
    //     },
    //     {
    //         id: 67890,
    //         email: 'email@gmail.com',
    //         cost: 50,
    //         date: '2024-04-15',
    //         address: '123 Main St',
    //         city: 'City',
    //         state: 'State',
    //         zipcode: '12345',
    //     },
    //     // Add more shipping data as needed
    // ];

    useEffect(() => {
        const fetchShippingData = async () => {
            try {
                const response = await axios.get("https://shastamart-api-deploy.vercel.app/api/shipping/getShippingInfo");
                console.log(response.data);
                const shippingData = response.data.map((shipping: shippingData) => ({
                    shippingID: shipping.shippingID,
                    customerEmail: shipping.customerEmail,
                    orderID: shipping.orderID,
                    cost: shipping.cost,
                    trackingNum: shipping.trackingNum,
                    estimatedDel: new Date(shipping.estimatedDel).toLocaleDateString(),
                    shippingStatus: shipping.shippingStatus,
                    streetAddress: shipping.streetAddress,
                    city: shipping.city,
                    state: shipping.state,
                    zipcode: shipping.zipcode,
                }))
                // response.data[0].estimatedDel = new Date(response.data[0].estimatedDel).toLocaleDateString()
                setShippingInfo(shippingData);
            } catch(error) {
                console.log(error);
            }
        };

        fetchShippingData();
    }, []);

    // Function to handle order selection
    // const orderSelectHandler = (orderId: string) => {
    //     console.log(orderId);
    //     setSelectedOrder(orderId); // Set selected order
    //     setSheetOpen(true); // Open the sheet
    // };

    // // Function to handle sheet open/close
    // function sheetOpenHandler(order: number) {
    //     console.log('Sheet Opened for order: ', order);
    //     setSelectedOrder(order);
    //     setSheetOpen(!sheetOpen);
    //   }
    
    //   function sheetCloseHandler() {
    //     console.log('Sheet Closed');
    //     setSheetOpen(!sheetOpen);
    //   }

    return (
        <>
            <div className="flex min-h-screen flex-col overflow-x-hidden bg-bgwhite font-inter text-black">
                <Header color="blue" />
                <div className="flex w-screen flex-col">
                    <h1 className="m-10 pt-14 font-inter text-5xl font-medium text-black">
                        Shipping Information
                    </h1>
                    <Table className="max-w-screen ml-0 rounded-lg bg-gray-50">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="ml-5 max-w-5  text-gray-700">
                                    ID
                                </TableHead>
                                <TableHead className="text-gray-700">Order ID</TableHead>
                                <TableHead className="max-w-5 text-gray-700">Tracking Number</TableHead>
                                <TableHead className="max-w-5 text-gray-700">Email</TableHead>
                                <TableHead className="max-w-5 text-gray-700">Cost</TableHead>
                                <TableHead className="max-w-5 text-gray-700">Est. Date</TableHead>
                                <TableHead className="max-w-5 text-gray-700">Address</TableHead>
                                <TableHead className="max-w-5 text-gray-700">City</TableHead>
                                <TableHead className="text-left pr-10 text-gray-700">State</TableHead>
                                <TableHead className="text-center max-w-5 text-gray-700">Zipcode</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {shippingInfo.map((item) => (
                                <TableRow
                                    key={item.shippingID}>
                                    {/* onClick={() => orderSelectHandler(item.email)}> */}
                                    <TableCell>{item.shippingID}</TableCell>
                                    <TableCell>{item.orderID}</TableCell>
                                    <TableCell>{item.trackingNum}</TableCell>
                                    <TableCell>{item.customerEmail}</TableCell>
                                    <TableCell>{item.cost}</TableCell>
                                    <TableCell>{item.estimatedDel}</TableCell>
                                    <TableCell>{item.streetAddress}</TableCell>
                                    <TableCell>{item.city}</TableCell>
                                    <TableCell>{item.state}</TableCell>
                                    <TableCell>{item.zipcode}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* {sheetOpen ? (
                        <div>
                        <Sheet defaultOpen={true} onOpenChange={sheetCloseHandler}>
                            <SheetContent side="right" className="overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle>Shipping Order #{selectedOrder}</SheetTitle>
                            </SheetHeader>
                            <SheetDescription asChild className="mb-3">
                                <div>
                                <div>Order Date: {orderToDisplay?.orderDate}</div>
                                <div>Payment Method: {orderToDisplay?.paymentMethod}</div>
                                <div>Order Status:</div>
                                </div>
                            </SheetDescription>
                            <Table className="ml-0 max-w-full rounded-lg bg-gray-50">
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
                                <Separator />
                                <TableRow>
                                    <TableCell className="max-w-6 pl-6">Total</TableCell>
                                    <TableCell
                                    className=" max-w-9 p-0 pr-9 text-right"
                                    colSpan={2}>
                                    {orderToDisplay?.total.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}
                                    </TableCell>
                                </TableRow>
                                </TableBody>
                            </Table>
                            </SheetContent>
                        </Sheet>
                        </div>
                    ) : (
                        <></>
                    )} */}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ShippingInformation;