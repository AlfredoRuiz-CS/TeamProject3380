import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { productItem } from "@/components/ProductCard.tsx";
import ProductCard from "@/components/ProductCard.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";

interface productProps {
  products: productItem[];
}

let dummyProduct: productItem = {
  name: "Fresh Strawberries, 1 lb.",
  price: 10.99,
  description: [
    "Organic, locally-sourced strawberries",
    "Grown in Gary, Indiana",
  ],
  image: "/assets/strawberries.jpg",
  stock: 10,
  portion: "lb.",
};

const Products = () => {
  return (
    <>
      <div className="font-poppins flex min-h-screen flex-col overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite text-black">
        <Header />

        <div className="flex flex-col items-center text-center">
          <h1 className="mb-5 pt-[5rem] font-jua text-7xl">
            Browse All Products
          </h1>
          {/* List of Product Items */}
          <div>
            <ProductCard product={dummyProduct} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
