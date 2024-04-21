import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { productItem } from '@/components/store';
import ProductCard from '@/components/ProductCard.tsx';
import { useState, useEffect } from 'react';
import useUserStore from '@/components/store';
import { useProductsStore } from '@/components/store';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface ProductApiResponse {
  productID: number;
  productName: string;
  productDesc: string;
  productPrice: string;
  stockQuantity: number;
  categName: string;
  image: string;
  supplier: string;
  supplierStock: number;
  supplierPrice: number;
  portion: string;
  servingSize: string;
  servingsPerContainer: string;
  calories: number;
  totalFat: string;
  cholesterol: string;
  sodium: string;
  totalCarbohydrates: string;
  dietaryFiber: string;
  sugars: string;
  protein: string;
  potassium: string;
  vitaminA: string;
  vitaminC: string;
  vitaminD: string;
  vitaminE: string;
  calcium: string;
  iron: string;
  dimensionsLength: string;
  dimensionsWidth: string;
  dimensionsHeight: string;
  weight: string;
}

// export enum Category {
//   produce = 1,
//   meat = 2,
//   fish = 3,
//   dairy = 4,
//   snacks = 5,
// }

// export function mapCategory(categoryID: number): string {
//   return Category[categoryID] || 'Unknown Category';
// }

const Products = () => {
  const store = useUserStore();
  let [valueSortOrder, setValueSortOrder] = useState('Price Desc.');
  let [catSortOrder, setCatSortOrder] = useState('All');
  const { setProducts } = useProductsStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'https://shastamart-api-deploy.vercel.app/api/products/getAllProducts'
        );
        const productsData = await response.data;
        const transformedProducts = productsData.map(
          (product: ProductApiResponse) => ({
            productId: product.productID,
            name: product.productName,
            description: product.productDesc.split('. '),
            price: parseFloat(product.productPrice),
            stock: product.stockQuantity,
            category: product.categName,
            image: product.image,
            supplier: product.supplier,
            supplierStock: product.supplierStock,
            portion: product.portion,
            supplierPrice: product.supplierPrice,
            nutritionFacts: {
              servingSize: product.servingSize,
              servingsPerContainer: product.servingsPerContainer,
              calories: product.calories,
              totalFat: product.totalFat,
              cholesterol: product.cholesterol,
              sodium: product.sodium,
              totalCarbohydrates: product.totalCarbohydrates,
              dietaryFiber: product.dietaryFiber,
              sugars: product.sugars,
              protein: product.protein,
              potassium: product.potassium,
              vitaminA: product.vitaminA,
              vitaminC: product.vitaminC,
              vitaminD: product.vitaminD,
              vitaminE: product.vitaminE,
              calcium: product.calcium,
              iron: product.iron,
            },
            shippingDetails: {
              dimensions: {
                length: product.dimensionsLength,
                width: product.dimensionsWidth,
                height: product.dimensionsHeight,
              },
              weight: product.weight,
            },
          })
        );
        setProducts(transformedProducts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [setProducts]);

  const products = useProductsStore((state) => state.products);
  const [orderedProducts, setOrderedProducts] = useState<productItem[]>([]);

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
      case 'In List':
        return [
          ...store.List,
          ...p.filter((product) => store.List.includes(product)),
        ];
      default:
        return p;
    }
  }

  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite font-inter text-black">
        <Header />

        <div className="flex flex-col items-center text-center">
          <h1 className="mb-5 pt-[5rem] font-jua text-7xl">
            Browse All Products
          </h1>
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
                <SelectItem value="In List">In List</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* List of Product Items */}
          <div className="flex flex-row flex-wrap justify-center gap-7 pb-7">
            {orderedProducts.map((product, index) => (
              <ProductCard key={index} product={product} list />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
