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

interface productProps {
    products?: productItem[];
}

const productList: React.FC<productProps> = ({ products = [] }) => {
    const [catSortOrder, setCatSortOrder] = useState('All');
    const [valueSortOrder, setValueSortOrder] = useState('Price Desc.');

    return (
        <>
            <div className="font-poppins flex min-h-screen flex-col overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite text-black">
                <Header />
                <div className="flex flex-col items-center text-center">
                    <h1 className="mb-5 pt-[5rem] font-jua text-7xl">
                        Shopping List
                    </h1>
                    {/* Dropdown for sorting */}
                    <div className="flex gap-2 place-self-start pb-5">
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
                                <SelectItem value="In List">In List</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                {/* Display products */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {products.map((product) => (
                        <ProductCard key={product.productId} product={product} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default productList;
