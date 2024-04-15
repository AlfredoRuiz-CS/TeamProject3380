import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { FaTrashCan } from 'react-icons/fa6';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// import { dummyProducts } from './Products';
import ProductCard from '@/components/ProductCard.tsx';
import useUserStore from '@/components/store';
import { productItem } from '@/components/store';

const ProductList = () => {
    const store = useUserStore();
    let [valueSortOrder, setValueSortOrder] = useState('Price Desc.');
    let [catSortOrder, setCatSortOrder] = useState('All');
    const products = store.List;
    const [orderedProducts, setOrderedProducts] = useState<productItem[]>(
        sortProducts(products)
    );

    function emptyList() {
        store.resetList();
        toast.success('List has been emptied!', {
            position: 'bottom-right',
            className: 'font-bold text-black',
            duration: 2000,
        });
    }

    useEffect(() => {
        let sorted = sortProducts(products);
        setOrderedProducts(sorted);
    }, [products, catSortOrder, valueSortOrder]);

    function sortProducts(p: productItem[]) {
        if (catSortOrder !== 'All') {
            p = products.filter((product) => product.category === catSortOrder);
        }

        if (products.length === 0) p = products;

        switch (valueSortOrder) {
            case 'Price Desc.':
                return p.sort((a, b) => b.price - a.price);
            case 'Price Asc.':
                return p.sort((a, b) => a.price - b.price);
            case 'Alpha Desc.':
                return p.sort((a, b) => a.name.localeCompare(b.name));
            case 'Alpha Asc.':
                return p.sort((a, b) => b.name.localeCompare(a.name));

            default:
                return p;
        }
    }

    return (
        <>
            <div className="flex min-h-screen flex-col overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite font-inter text-black">
                <Header />
                <div className="flex flex-col items-center text-center">
                    <h1 className="mb-5 pt-[5rem] font-jua text-7xl">My List</h1>
                    {/* Dropdown for sorting */}
                    <div className="flex gap-2 place-self-start pb-5">
                        <h3 className="items-center place-self-center pl-10 font-inter text-lg font-medium">
                            Category:{' '}
                        </h3>

                        {/* Sort Dropdown for category */}
                        <Select
                            defaultValue="All"
                            onValueChange={(e) => setCatSortOrder(e)}>
                            <SelectTrigger className="h-10 w-[8rem] bg-white text-black ">
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All</SelectItem>
                                <SelectItem value="produce">Produce</SelectItem>
                                <SelectItem value="meat">Meat</SelectItem>
                                <SelectItem value="fish">Fish</SelectItem>
                                <SelectItem value="dairy">Dairy</SelectItem>
                                <SelectItem value="snacks">Snacks</SelectItem>
                            </SelectContent>
                        </Select>

                        <h3 className="items-center place-self-center pl-2 font-inter text-lg font-medium">
                            Sort by:{' '}
                        </h3>

                        {/* Select Dropdown for sorting products by value */}
                        <Select
                            defaultValue="Price Desc."
                            onValueChange={(e) => setValueSortOrder(e)}>
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
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="my-auto ml-5 border border-darkblue bg-transparent text-center text-darkblue hover:bg-darkblue hover:text-bgwhite">
                                    <FaTrashCan className="mr-2 h-4 w-4" />
                                    Empty List
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action will clear every item in your list.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={emptyList}>
                                        Confirm
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    {/* List of Product Items */}
                    {/* <div className="mx-[10rem] flex flex-row flex-wrap gap-7"> */}
                    <div className="flex flex-row flex-wrap justify-center gap-7 pb-7">
                        {/* Display Product Cards */}
                        {orderedProducts.map((product) => (
                            <ProductCard
                                key={product.productId}
                                product={product}
                                removeList
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductList;
