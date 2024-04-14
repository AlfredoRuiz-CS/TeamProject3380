// import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { useEffect } from 'react';
import {
    Table,
    // TableBody,
    // TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';


const ShippingInformation = () => {
    // const navigate = useNavigate();
    // const [shippingData, setShippingData] = useState([]);

    useEffect(() => {
        const fetchShippingData = async () => {
            try {
                // const response = await axios.get(
                //     'https://shastamart-api-deploy.vercel.app/api/shipping/getAllShippingInformation'
                // );
                // setShippingData(response.data);
            } catch (error) {
                console.error('Error fetching shipping data:', error);
            }
        };

        fetchShippingData();
    }, []);

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
                                <TableHead className="ml-8 max-w-6 pl-6 text-gray-700">
                                    Shipping ID
                                </TableHead>
                                <TableHead className="max-w-5 text-gray-700">Address</TableHead>
                                <TableHead className="max-w-5 text-gray-700">City</TableHead>
                                <TableHead className="max-w-5 text-gray-700">State</TableHead>
                                <TableHead className="max-w-5 text-gray-700">Zipcode</TableHead>
                                {/* Add more table headers as needed */}

                            </TableRow>
                        </TableHeader>
                    </Table>
                </div>

            </div>
            <Footer />
        </>
    );
};

export default ShippingInformation;

