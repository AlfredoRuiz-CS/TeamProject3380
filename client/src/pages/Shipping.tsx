import { useState } from 'react'; // Import React and useState
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect } from 'react'; // Remove useState import
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
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

export const ShippingInformation = () => {
    const [sheetOpen, setSheetOpen] = useState(false); // State for sheet open/close
    const [selectedOrder, setSelectedOrder] = useState(null); // State for selected order

    const shippingData = [
        // Sample shipping data
        { id: 1, email: 1234, cost: 50, date: '2024-04-15', address: '123 Main St', city: 'City', state: 'State', zipcode: '12345' },
        { id: 22222222222222, email: 'email@gmail.com', cost: 50, date: '2024-04-15', address: '123 Main St', city: 'City', state: 'State', zipcode: '12345' }
        // Add more shipping data as needed
    ];

    useEffect(() => {
        const fetchShippingData = async () => {
            // Fetch shipping data
        };

        fetchShippingData();
    }, []);

    // Function to handle order selection
    const orderSelectHandler = (orderId) => {
        setSelectedOrder(orderId); // Set selected order
        setSheetOpen(true); // Open the sheet
    };

    // Function to handle sheet open/close
    const sheetOpenHandler = () => {
        setSheetOpen(!sheetOpen); // Toggle sheet open/close
        setSelectedOrder(null); // Reset selected order when closing sheet
    };

    return (
        <>
            <div className="flex min-h-screen flex-col overflow-x-hidden bg-bgwhite font-inter text-black">
                <Header color="blue" />
                <div className="flex w-screen flex-col">
                    <h1 className="m-16 pt-14 font-inter text-5xl font-medium text-black">
                        Shipping Information
                    </h1>
                    <Table className="max-w-screen ml-0 rounded-lg bg-gray-50">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="ml-8 max-w-5 pl-3 text-gray-700">
                                    Shipping ID
                                </TableHead>
                                <TableHead className="max-w-5 text-gray-700">Email</TableHead>
                                <TableHead className="max-w-5 text-gray-700">Cost</TableHead>
                                <TableHead className="max-w-5 text-gray-700">Date</TableHead>
                                <TableHead className="max-w-5 text-gray-700">Address</TableHead>
                                <TableHead className="max-w-5 text-gray-700">City</TableHead>
                                <TableHead className="max-w-5 text-gray-700">State</TableHead>
                                <TableHead className="max-w-5 text-gray-700">Zipcode</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {shippingData.map((item) => (
                                <TableRow key={item.id} onClick={() => orderSelectHandler(item.email)}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.cost}</TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{item.address}</TableCell>
                                    <TableCell>{item.city}</TableCell>
                                    <TableCell>{item.state}</TableCell>
                                    <TableCell>{item.zipcode}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {sheetOpen && (
                        <Sheet defaultOpen={true} onOpenChange={sheetOpenHandler}>
                            <SheetContent side="right" className="overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>Shipping Details</SheetTitle>
                                    <SheetDescription asChild>
                                        {/* Sheet content */}
                                        {/* Add detailed shipping information here */}
                                    </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ShippingInformation;
