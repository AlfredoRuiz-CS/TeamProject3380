import React from "react";

export type productItem = {
  name: string;
  price: number;
  description: string[];
  //   I have no idea how to grab an image from the backend...
  image: string;
  stock: number;
};

interface ProductCardProps {
  product: productItem;
}

const ProductCard = (props: ProductCardProps) => {
  return (
    <>
      <div className="bg-cardwhite flex h-[30rem] w-[25rem] flex-col items-center rounded-xl">
        {/* Product Image */}
        <div className="flex h-[15rem] w-[20rem] items-center justify-center rounded-lg">
          <img src={props.product.image}></img>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
