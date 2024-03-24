// import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button.tsx";
// import { productItem } from '@/components/store';
// import ProductCard from '@/components/ProductCard.tsx';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { dummyProducts } from './Products';

const productList = (/*{ products = [] }*/) => { // const productList: React.FC<productProps> = ({ products = [] }) => {
    // const [catSortOrder, setCatSortOrder] = useState('All');
    // const [valueSortOrder, setValueSortOrder] = useState('Price Desc.');

    /*
    const listItems = dummyProducts.map((item) =>
        <div className="card" key={item.productId}>
            <div className="card_img">
                <img src={item.image} />
            </div>
            <div className="card_header">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p className="price">${item.price}</p>
                <div className="btn">Add to Cart</div>
            </div>
        </div>);
        */
    const listItems = dummyProducts.map((item) => (
        <div className="card bg-white rounded-lg shadow-md p-4" key={item.productId}>
            <div className="card_img">
                <img src={item.image} alt={item.name} className="w-full h-auto" />
            </div>
            <div className="card_header mt-4">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-green-600 font-bold mt-2">${item.price}</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600">
                    Add to Cart
                </button>
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
                            {/* Sort Dropdown for category */}
                            <Select
                                defaultValue="All"
                                // onValueChange={(e) => setCatSortOrder(e)}
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

                            {/* Select Dropdown for sorting products by value */}
                            <Select
                                defaultValue="Price Desc."
                                // onValueChange={(e) => setValueSortOrder(e)}
                            >
                                <SelectTrigger className="h-10 w-[10rem] bg-white text-black ">
                                    <SelectValue placeholder="Price Desc." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Price Desc.">Price Desc.</SelectItem>
                                    <SelectItem value="Price Asc.">Price Asc.</SelectItem>
                                    <SelectItem value="Alpha Desc.">Alphabetical Desc.</SelectItem>
                                    <SelectItem value="Alpha Asc.">Alphabetical Asc.</SelectItem>
                                    <SelectItem value="In List">In List</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                {/*<div className="mx-[10rem] flex flex-row flex-wrap gap-10">
                    {listItems}
    </div> */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">{listItems}</div>;
            </div>
            <Footer />
        </>
    );
};

export default productList;