import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button.tsx";
import { productItem } from '@/components/store';
import ProductCard from '@/components/ProductCard.tsx';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { dummyProducts } from './Products';

const productList: React.FC<productProps> = ({ products = [] }) => {
    const [catSortOrder, setCatSortOrder] = useState('All');
    const [valueSortOrder, setValueSortOrder] = useState('Price Desc.');
    const [productQuantities, setProductQuantities] = useState(
        dummyProducts.reduce((acc, product) => ({ ...acc, [product.productId]: 0 }), {})
    );
    const [QuantityEnabled, setQuantityEnabled] = useState(true); // State to control the visibility of the quantity dropdown

    /* const productList = (/*{ products = [] }*///)// => { // const productList: React.FC<productProps> = ({ products = [] }) => {
    // const [catSortOrder, setCatSortOrder] = useState('All');
    // const [valueSortOrder, setValueSortOrder] = useState('Price Desc.'); */

    const incrementQuantity = (productId) => {
        setProductQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: prevQuantities[productId] + 1
        }));
    };

    const decrementQuantity = (productId) => {
        setProductQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: prevQuantities[productId] > 0 ? prevQuantities[productId] - 1 : 0
        }));
    };

    /* const quantityDropdownToggle = () => {
         setQuantityEnabled(!QuantityEnabled); // Toggle the visibility of the quantity dropdown
     }; */
    const [activeProductId, setActiveProductId] = useState<string | null>(null);

    const quantityDropdownToggle = (productId: string) => {
        // Toggle the active product ID to show/hide the dropdown for the clicked product
        setActiveProductId(activeProductId === productId ? null : productId);
    };


    // Inside your productList component, where you render the product cards
    const listItems = dummyProducts.map((item) => (
        <div className="card bg-white rounded-lg shadow-md p-4 mb-4" key={item.productId}>
            <div className="card_img">
                <img src={item.image} alt={item.name} className="w-full h-auto" />
            </div>
            <div className="card_header mt-4">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-green-600 font-bold mt-2">${item.price}</p>
                <div className="flex space-x-4"> {/* This div acts as the flex container */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-black font-jua py-2 px-4 rounded mt-4">
                        Add to Cart
                    </button>
                    {activeProductId === item.productId ? (
                        <div className="flex flex-row gap-2">
                            <Button
                                className="text-md w-14 rounded-lg bg-[#48C9E5] py-5 font-jua text-black hover:bg-[#48C9E5]/85"
                                onClick={() => quantityDropdownToggle(item.productId)}
                            >
                                Qty.
                            </Button>
                            <Select
                                defaultValue="1"
                                onValueChange={(e) => setProductQuantities({ ...productQuantities, [item.productId]: parseInt(e) })}
                            >
                                <SelectTrigger className="h-10 w-[3rem] flex-grow border border-black bg-gray-200">
                                    <SelectValue placeholder="1" />
                                </SelectTrigger>
                                <SelectContent side="bottom">
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                    <SelectItem value="4">4</SelectItem>
                                    <SelectItem value="5">5</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    ) : (
                        <Button
                            className="text-md w-14 rounded-lg bg-quantityblue py-5 font-jua text-black hover:bg-quantityblue/85"
                            onClick={() => quantityDropdownToggle(item.productId)}
                        >
                            Qty.
                        </Button>
                    )}
                    <button className="bg-red-500 hover:bg-red-700 text-black font-jua py-2 px-4 rounded mt-4" onClick={() => removeFromList(item.productId)}>
                        Remove from List
                    </button>
                </div>
            </div>
        </div>
    ));


    return (
        <>
            <div className="font-poppins flex min-h-screen flex-col overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite text-black">
                <Header />
                <div className=" p-8">
                    <div className="flex flex-col items-center text-center ">
                        <h1 className="mb-5 pt-[5rem] font-jua text-7xl">
                            Shopping List
                        </h1>
                        {/* Dropdown for sorting */}
                        <div className="flex gap-2 place-self-start pb-5">
                            <h3 className="items-center place-self-center pl-10 font-inter text-lg font-medium">
                                Category:{' '}
                            </h3>

                            {/* Sort Dropdown for category */}
                            <Select
                                defaultValue="All"
                                onValueChange={(e) => setCatSortOrder(e)}
                            >
                                <SelectTrigger className="h-10 w-[8rem] bg-white text-black ">
                                    <SelectValue placeholder="All" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All</SelectItem>
                                    <SelectItem value="Produce">Produce</SelectItem>
                                    <SelectItem value="Meat">Meat</SelectItem>
                                    <SelectItem value="Fish">Fish</SelectItem>
                                    <SelectItem value="Dairy">Dairy</SelectItem>
                                    <SelectItem value="Snacks">Snacks</SelectItem>
                                </SelectContent>
                            </Select>

                            <h3 className="items-center place-self-center pl-2 font-inter text-lg font-medium">
                                Sort by:{' '}
                            </h3>

                            {/* Select Dropdown for sorting products by value */}
                            <Select
                                defaultValue="Price Desc."
                                onValueChange={(e) => setValueSortOrder(e)}
                            >
                                <SelectTrigger className="h-10 w-[10rem] bg-white text-black ">
                                    <SelectValue placeholder="Price Desc." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Price Desc.">Price Desc.</SelectItem>
                                    <SelectItem value="Price Asc.">Price Asc.</SelectItem>
                                    <SelectItem value="Alpha Desc.">Alphabetical Desc.</SelectItem>
                                    <SelectItem value="Alpha Asc.">Alphabetical Asc.</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">{listItems}</div>
            </div>
            <Footer />
        </>
    );
};

export default productList;
