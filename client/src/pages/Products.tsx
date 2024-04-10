import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { productItem } from '@/components/store';
import ProductCard from '@/components/ProductCard.tsx';
import { useState, useEffect } from 'react';
import useUserStore from '@/components/store';
import { useProductsStore } from '@/components/store';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

//Produce
const strawberries: productItem = {
  productId: 10001,
  name: 'Fresh Strawberries',
  price: 3.97,
  image: '/assets/strawberries.jpg',
  stock: 10,
  supplier: 'Berry Farms',
  supplierStock: 100,
  portion: 'lb.',
  category: 'produce',
  description: [
    'Organic, locally-sourced strawberries',
    'Grown in Gary, Indiana',
    'good source of Vitamin C, fiber and potassium',
  ],
  shippingDetails: {
    dimensions: {
      length: '7.38 inches',
      width: '6.38 inches',
      height: '2.3 inches',
    },
    weight: '14 ounces',
  },
  nutritionFacts: {
    servingSize: '8 medium strawberries',
    servingsPerContainer: '1.5',
    calories: 50,
    totalFat: '0',
    sodium: '0',
    totalCarbohydrates: '11 g',
    dietaryFiber: '2 g',
    sugars: '8 g',
    protein: '1 g',
    potassium: '170 mg',
    vitaminA: '1 mg',
    vitaminC: '144 mg',
    calcium: '24 mg',
    iron: '0.6 mg',
  },
};
// ! FOR FUTURE REFERENCE KEEP BULLETPOINTS >105 CHARACTERS
// ! KEEP NAME >40 CHARACTERS
const greenBeans: productItem = {
  productId: 10002,
  name: 'Fresh Steamable Green Beans',
  price: 2.67,
  image: '/assets/greenbeans.jpg',
  stock: 27,
  supplier: "Josh's Beans",
  supplierStock: 120,
  portion: 'oz.',
  category: 'produce',
  description: [
    'Prewashed, trimmed, and ready to cook',
    'No artificial growth hormones',
    'Can be cooked on the stovetop or steamed in the microwave',
  ],
  shippingDetails: {
    dimensions: {
      length: '9.25 inches',
      width: '6 inches',
      height: '1.2 inches',
    },
    weight: '12 ounces',
  },
  nutritionFacts: {
    servingSize: '3/4 Cup',
    servingsPerContainer: '4',
    calories: 25,
    totalFat: '0 g',
    sodium: '5 mg',
    totalCarbohydrates: '11 g',
    dietaryFiber: '2 g',
    sugars: '3 g',
    protein: '2 g',
    potassium: '180 mg',
    calcium: '30 mg',
    iron: '1 mg',
  },
};
const bananas: productItem = {
  productId: 10003,
  name: 'Fresh Bunch of Organic Bananas',
  price: 1.82,
  image: '/assets/bananas.jpg',
  stock: 15,
  supplier: 'North Side Banana Co.',
  supplierStock: 100,
  portion: 'lb.',
  category: 'produce',
  description: [
    'Bunch of bananas (about 4-7 total)',
    'Ripe and ready to enjoy',
    'Convenient Fruit Snack',
    'Convenient Fruit Snack',
  ],
  shippingDetails: {
    dimensions: {
      length: '10 inches',
      width: '4.5 inches',
      height: '3.5 inches',
    },
    weight: '2.45 pounds',
  },
  nutritionFacts: {
    servingSize: '1 Banana',
    servingsPerContainer: '4-7 bananas',
    calories: 110,
    totalFat: '0 g',
    sodium: '0 mg',
    totalCarbohydrates: '29 g',
    dietaryFiber: '4 g',
    sugars: '14 g',
    protein: '1 g',
    potassium: '422 g',
    calcium: '30 mg',
  },
};
const avocado: productItem = {
  productId: 10004,
  name: 'Fresh Jumbo Hass Avocado',
  price: 2.6,
  image: '/assets/strawberries.jpg',
  stock: 10,
  supplier: 'Houston Avocado Co',
  supplierStock: 50,
  portion: 'oz.',
  category: 'produce',
  description: [
    'Fresh avocados with a creamy, nutty taste',
    'Fresh avocados with a creamy, nutty taste',
    'Ripe when slightly soft, yet firm',
    'Key guacamole ingredient',
  ],
  shippingDetails: {
    dimensions: {
      length: '5.4 inches',
      width: '2.2 inches',
      height: '2.5 inches',
    },
    weight: '7.6 ounces',
  },
  nutritionFacts: {
    servingSize: '1/3 of the Avocado',
    servingsPerContainer: '3.00',
    calories: 80,
    totalFat: '8 g',
    sodium: '0 mg',
    dietaryFiber: '3 g',
    sugars: '0 g',
    protein: '1 g',
    potassium: '250 mg',
    calcium: '10 mg',
  },
};

//Meat
const chicken: productItem = {
  productId: 20001,
  name: 'Chicken Wing Portions',
  price: 8.07,
  image: '/assets/chicken.jpg',
  stock: 12,
  supplier: 'Happy Chicken Farms',
  supplierStock: 50,
  portion: 'lb.',
  category: 'meat',
  description: [
    'Fresh chicken wing portion',
    'Fresh chicken wing portion',
    'No added hormones, 100% natural',
    'Hatched, raised, and harvested in USA',
  ],
  shippingDetails: {
    dimensions: {
      length: '10.75 inches',
      width: '6.8 inches',
      height: '2.1 inches',
    },
    weight: '1.81 pounds',
  },
  nutritionFacts: {
    servingSize: '4 oz',
    servingsPerContainer: 'varies per container',
    calories: 210,
    totalFat: '14 g',
    cholesterol: '125 mg',
    sodium: '95 mg',
    totalCarbohydrates: '0 g',
    dietaryFiber: '0 g',
    sugars: '0 g',
    protein: '20 g',
    potassium: '210 g',
    iron: '1 mg',
  },
};
const beef: productItem = {
  productId: 20002,
  name: 'Center Cut Beef Sirloin Steaks  ',
  price: 9.97,
  image: '/assets/beef.jpg',
  stock: 10,
  supplier: "Bill's Beef",
  supplierStock: 100,
  portion: 'lb.',
  category: 'meat',
  description: [
    'USDA Select Grade Beef',
    'Lean, juicy, and tender steaks',
    'Always natural, no artificial ingredients or preservatives',
  ],
  shippingDetails: {
    dimensions: {
      length: '9.4 inches',
      width: '4.8 inches',
      height: '1.5 inches',
    },
    weight: '1.2 pounds',
  },
  nutritionFacts: {
    servingSize: '1 steak',
    servingsPerContainer: '3 steaks',
    calories: 200,
    totalFat: '11 g',
    cholesterol: '75 mg',
    sodium: '75 mg',
    totalCarbohydrates: '0 g',
    sugars: '0 g',
    protein: '22 g',
    potassium: '360 g',
    calcium: '0 g',
    iron: '0 mg',
  },
};
const pork: productItem = {
  productId: 20003,
  name: 'Bone-in Center Loin Pork Chops',
  price: 4.8,
  image: '/assets/porkchop.jpg',
  stock: 7,
  supplier: "Timmmy's Pork",
  supplierStock: 40,
  portion: 'lb.',
  category: 'meat',
  description: [
    'Fresh, 100% natural pork cuts',
    'No preservatives or added hormones',
    'Fresh, 100% natural pork cuts',
    'No preservatives or added hormones',
    'Provided from your local butcher, Timmy’s Pork',
  ],
  shippingDetails: {
    dimensions: {
      length: '8.1 inches',
      width: '4.2 inches',
      height: '1.25 inches',
    },
    weight: '1.25 pounds',
  },
  nutritionFacts: {
    servingSize: '1 Pork Chop',
    servingsPerContainer: 'varies per container',
    calories: 240,
    totalFat: '14 g',
    sodium: '70 mg',
    totalCarbohydrates: '0 g',
    sugars: '0 g',
    protein: '1 g',
    potassium: '26 g',
    calcium: '0 mg',
    iron: '0 mg',
  },
};
const sausage: productItem = {
  productId: 20004,
  name: 'Heritage Smoked Beef Sausage',
  price: 5.19,
  image: '/assets/sausage.jpg',
  stock: 14,
  supplier: "Bill's Beef",
  supplierStock: 50,
  portion: 'oz.',
  category: 'meat',
  description: [
    'Authentic, Texas flavor, perfect for your next cookout',
    'Made with quality cuts of beef, gluten free, no MSG',
    'An excellent main course or side dish',
    'An excellent main course or side dish',
  ],
  shippingDetails: {
    dimensions: {
      length: '6.4 inches',
      width: '4.6 inches',
      height: '1.75 inches',
    },
    weight: '12 ounces',
  },
  nutritionFacts: {
    servingSize: '2 oz',
    servingsPerContainer: '6',
    calories: 180,
    totalFat: '16 g',
    cholesterol: '35 mg',
    sodium: '390 mg',
    totalCarbohydrates: '0 g',
    sugars: '1 g',
    protein: '8 g',
    potassium: '230 mg',
    calcium: '10 mg',
    iron: '1 mg',
  },
};

//fish
const salmon: productItem = {
  productId: 30001,
  name: 'Fresh Atlantic Salmon Portions',
  price: 20.86,
  image: '/assets/salmon.jpg',
  stock: 5,
  supplier: 'North Atlantic Seafood',
  supplierStock: 30,
  portion: 'oz.',
  category: 'fish',
  description: [
    'Classic, fresh Atlantic salmon',
    'Classic, fresh Atlantic salmon',
    'Pre-cut into 4 portions for easy preparation',
    'Bake, grill, or pan-fry skin side down for best results',
  ],
  shippingDetails: {
    dimensions: {
      length: '10.3 inches',
      width: '6.5 inches',
      height: '1.25 inches',
    },
    weight: '20 ounces',
  },
  nutritionFacts: {
    servingSize: '1 Fillet',
    servingsPerContainer: '4',
    calories: 290,
    totalFat: '19 g',
    cholesterol: '80 mg',
    sodium: '85 mg',
    protein: '29 g',
    potassium: '510 mg',
    vitaminD: '16 mcg',
    calcium: '10 mg',
    iron: '0 mg',
  },
};
const shrimp: productItem = {
  productId: 30002,
  name: 'Frozen Tail-On Jumbo Cooked Shrimp',
  price: 10.37,
  image: '/assets/shrimp.jpg',
  stock: 10,
  supplier: 'North Atlantic Seafood',
  supplierStock: 50,
  portion: 'lb.',
  category: 'fish',
  description: [
    'Pre-cooked and frozen',
    'Already deveined and peeled',
    'Thaw in refrigerator overnight or under cold running water for a few minutes',
  ],
  shippingDetails: {
    dimensions: {
      length: '9.4 inches',
      width: '5 inches',
      height: '1.2 inches',
    },
    weight: '1 pound',
  },
  nutritionFacts: {
    servingSize: '3 oz',
    servingsPerContainer: '5',
    calories: 60,
    totalFat: '0 g',
    cholesterol: '90 mg',
    sodium: '330 mg',
    sugars: '0 g',
    protein: '13 g',
    potassium: '30 g',
    calcium: '20 mg',
    iron: '1 mg',
  },
};
const crab: productItem = {
  productId: 30003,
  name: 'Wild Caught Jumbo Snow Crab Clusters ',
  price: 16.61,
  image: '/assets/crab.jpg',
  stock: 5,
  supplier: 'North Atlantic Seafood ',
  supplierStock: 20,
  portion: 'lb.',
  category: 'fish',
  description: [
    'Freshly caught from the Gulf of St. Laurence, Canada',
    'Freshly caught from the Gulf of St. Laurence, Canada',
    'Tender, white meat with a sweet, delicate flavor',
    'Approximately 12-14 oz average per cluster',
  ],
  shippingDetails: {
    dimensions: {
      length: '11.75 inches',
      width: '5.5 inches',
      height: '2.2 inches',
    },
    weight: '1.5 pounds',
  },
  nutritionFacts: {
    servingSize: '3 oz',
    servingsPerContainer: 'varies per container',
    calories: 110,
    totalFat: '4.5 g',
    cholesterol: '60 mg',
    sodium: '590 mg',
    sugars: '0 g',
    protein: '16 g',
    potassium: '220 mg',
    calcium: '10 mg',
    iron: '1.4 mg',
  },
};
const cod: productItem = {
  productId: 30004,
  name: 'Wild Caught Fresh Atlantic Cod',
  price: 16.75,
  image: '/assets/cod.jpg',
  stock: 10,
  supplier: 'North Atlantic Seafood ',
  supplierStock: 25,
  portion: 'lb.',
  category: 'fish',
  description: [
    'Wild caught and sustainably sourced',
    'Great for beer-battered fish & chips',
    'Flaky, firm, mild, delicious',
  ],
  shippingDetails: {
    dimensions: {
      length: '6.6 inches',
      width: '4.5 inches',
      height: '1.4 inches',
    },
    weight: '1 pound',
  },
  nutritionFacts: {
    servingSize: '4 oz',
    servingsPerContainer: 'varies per container',
    calories: 90,
    totalFat: '0.5 g',
    cholesterol: '40 mg',
    sodium: '80 mg',
    sugars: '0 g',
    protein: '20 g',
    potassium: '470 g',
    calcium: '20 mg',
    iron: '0.4 mg',
  },
};

//Dairy
const wholeMilk: productItem = {
  productId: 40001,
  name: 'Whole Milk',
  price: 3.7,
  image: '/assets/wholemilk.jpg',
  stock: 35,
  supplier: 'Sweet Dairy Farms',
  supplierStock: 100,
  portion: 'gal.',
  category: 'dairy',
  description: [
    'Excellent source of vitamins D & E',
    'Grade A, pasteurized, homogenized milk',
    'No artificial growth hormones',
  ],
  shippingDetails: {
    dimensions: {
      length: '11.9 inches',
      width: '6.7 inches',
      height: '4.2 inches',
    },
    weight: '9 pounds',
  },
  nutritionFacts: {
    servingSize: '1.00 cup',
    servingsPerContainer: '16',
    calories: 150,
    totalFat: '8 g',
    cholesterol: '25 mg',
    sodium: '100 mg',
    totalCarbohydrates: '12 g',
    dietaryFiber: '0 g',
    sugars: '12 g',
    protein: '8 g',
    potassium: '332 g',
    vitaminA: '10% Daily Value',
    vitaminD: '30% Daily Value',
    calcium: '0 mg',
    iron: '0 mg',
  },
};
const twoMilk: productItem = {
  productId: 40002,
  name: '2% Reduced Fat Milk ',
  price: 3.7,
  image: '/assets/twomilk.jpg',
  stock: 35,
  supplier: 'Sweet Dairy Farms',
  supplierStock: 100,
  portion: 'gal.',
  category: 'dairy',
  description: [
    'Made with 38% less fat than whole milk',
    'Made with 38% less fat than whole milk',
    'Enriched with Vitamin E',
    'No artificial growth hormones',
    'No artificial growth hormones',
  ],
  shippingDetails: {
    dimensions: {
      length: '11.9 inches',
      width: '6.7 inches',
      height: '4.2 inches',
    },
    weight: '9 pounds',
  },
  nutritionFacts: {
    servingSize: '1.00 cup',
    servingsPerContainer: '16',
    calories: 120,
    totalFat: '5 g',
    cholesterol: '20 mg',
    sodium: '190 mg',
    totalCarbohydrates: '12 g',
    sugars: '12 g',
    protein: '8 g',
    potassium: '342 mg',
    vitaminA: '10% Daily Value',
    vitaminC: '0 g',
    vitaminD: '25% Daily Value',
    vitaminE: '30% Daily Value',
    calcium: '30% Daily Value',
    iron: '0.4 mg',
  },
};
const cheese: productItem = {
  productId: 40003,
  name: 'Sharp Cheddar Sliced Cheese',
  price: 3.1,
  image: '/assets/cheese.jpeg',
  stock: 20,
  supplier: 'Sweet Dairy Farms',
  supplierStock: 150,
  portion: 'oz.',
  category: 'dairy',
  description: [
    'Tangy, complex flavor due to longer aging',
    'Tangy, complex flavor due to longer aging',
    'Thinly sliced for your convenience',
    'No artificial growth hormones',
    'No artificial growth hormones',
  ],
  shippingDetails: {
    dimensions: {
      length: '5.1 inches',
      width: '4.6 inches',
      height: '1 inches',
    },
    weight: '0.5 pounds',
  },
  nutritionFacts: {
    servingSize: '1 slice',
    servingsPerContainer: '10',
    calories: 90,
    totalFat: '8 g',
    cholesterol: '25 mg',
    sodium: '150 mg',
    totalCarbohydrates: '<1 g',
    sugars: '0 g',
    protein: '5 g',
    potassium: '5 g',
    vitaminD: '0.1 mcg',
    calcium: '160 mg',
    iron: '0 mg',
  },
};
const yogurt: productItem = {
  productId: 40004,
  name: 'Non-Fat Vanilla Bean Greek Yogurt',
  price: 3.62,
  image: '/assets/yogurt.jpg',
  stock: 15,
  supplier: 'Ricky & Rich Co.',
  supplierStock: 75,
  portion: 'lb.',
  category: 'dairy',
  description: [
    'Low in calories and rich in delicious taste',
    'Only 100 calories, great for any diet',
    'Small cup making this great for on the go',
  ],
  shippingDetails: {
    dimensions: {
      length: '5.5 inches',
      width: '3.9 inches',
      height: '3 inches',
    },
    weight: '1.3 pounds',
  },
  nutritionFacts: {
    servingSize: '1 container',
    servingsPerContainer: '4',
    calories: 100,
    totalFat: '0 g',
    sodium: '45 mg',
    totalCarbohydrates: '12 g',
    dietaryFiber: '0 g',
    sugars: '9 g',
    protein: '13 g',
    potassium: '220 g',
    calcium: '150 mg',
    iron: '0 mg',
  },
};


//Snacks
const chips: productItem = {
  productId: 50001,
  name: "Sasha's Barbecue Chips ",
  price: 2.98,
  image: '/assets/chips.jpg',
  stock: 30,
  supplier: 'Cougar Chips',
  supplierStock: 200,
  portion: 'oz.',
  category: 'snacks',
  description: [
    'Thin, crispy, sweet, and barbecue flavors in every bite',
    'Add an extra kick to packed lunches',
    'No certified synthetic colors',
    'No certified synthetic colors',
  ],
  shippingDetails: {
    dimensions: {
      length: '7.8 inches',
      width: '6.3 inches',
      height: '2 inches',
    },
    weight: '9 ounces',
  },
  nutritionFacts: {
    servingSize: '1 oz',
    servingsPerContainer: '9',
    calories: 150,
    totalFat: '9 g',
    sodium: '200 mg',
    totalCarbohydrates: '16 g',
    sugars: '1 g',
    protein: '2 g',
    potassium: '180 mg',
    calcium: '10 mg',
    iron: '0.6 mg',
  },
};
const chocolate: productItem = {
  productId: 50002,
  name: 'Star Bar Milk Chocolate Candy Bar',
  price: 1.22,
  image: '/assets/chocolate.jpg',
  stock: 50,
  supplier: 'Berry Farms',
  supplierStock: 250,
  portion: 'oz.',
  category: 'snacks',
  description: [
    "Rick, milky goodness, everyone's favorite treat",
    'A classic in homes for decades',
    'Enjoy alone or with your loved ones',
  ],
  shippingDetails: {
    dimensions: {
      length: '6.5 inches',
      width: '3.25 inches',
      height: '0.25 inches',
    },
    weight: '1.55 ounces',
  },
  nutritionFacts: {
    servingSize: '1 bar',
    servingsPerContainer: '1',
    calories: 220,
    cholesterol: '10 mg',
    sodium: '35 mg',
    sugars: '0 g',
    protein: '1 g',
    potassium: '4% Daily Value',
    calcium: '6% Daily Value',
    iron: '6% Daily Value',
  },
};
const pretzels: productItem = {
  productId: 50003,
  name: "Louis's Homestyle Pretzels",
  price: 6.22,
  image: '/assets/pretzels.jpg',
  stock: 15,
  supplier: 'Cougar Chips',
  supplierStock: 80,
  portion: 'oz.',
  category: 'snacks',
  description: [
    'Crunchy, salty, the perfect bite-size snack',
    'Classic flavors you know and love',
    'No artificial flavors or colors',
  ],
  shippingDetails: {
    dimensions: {
      length: '7.8 inches',
      width: '5.9 inches',
      height: '2 inches',
    },
    weight: '16 ounces',
  },
  nutritionFacts: {
    servingSize: '1 oz',
    servingsPerContainer: '16',
    calories: 130,
    cholesterol: '0 mg',
    sodium: '360 mg',
    potassium: '0 mg',
    calcium: '10 mg',
    iron: '<1 mg',
  },
};
const cookies: productItem = {
  productId: 50004,
  name: 'Specialty Pink Frosted Sugar Cookies ',
  price: 4.11,
  image: '/assets/cookies.jpg',
  stock: 15,
  supplier: "Karen's Bakery",
  supplierStock: 40,
  portion: 'oz.',
  category: 'snacks',
  description: [
    'A sweet treat perfect for any special occasion',
    'Nut-free',
    "Made locally by Karen's Bakery",
  ],
  shippingDetails: {
    dimensions: {
      length: '5.5 inches',
      width: '3.25 inches',
      height: '1.5 inches',
    },
    weight: '2 ounces',
  },
  nutritionFacts: {
    servingSize: '1 cookie',
    servingsPerContainer: '10',
    calories: 180,
    totalFat: '7 g',
    cholesterol: '10 mg',
    sodium: '95 mg',
    totalCarbohydrates: '27 g',
    sugars: '17 g',
    protein: '2 g',
    potassium: '20 mg',
    calcium: '10 mg',
    iron: '0.7 mg',
  },
};

export const dummyProducts: productItem[] = [
  strawberries,
  greenBeans,
  bananas,
  avocado,
  chicken,
  beef,
  pork,
  sausage,
  salmon,
  shrimp,
  crab,
  cod,
  wholeMilk,
  twoMilk,
  cheese,
  yogurt,
  chips,
  chocolate,
  pretzels,
  cookies,
];

interface ProductApiResponse {
  productID: number;
  productName: string;
  productDesc: string;
  productPrice: string;
  stockQuantity: number;
  categoryID: number;
  image: string;
  supplier: string;
  supplierStock: number;
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

enum Category {
  produce = 1,
  meat = 2,
  fish = 3,
  dairy = 4,
  snacks = 5,
}

function mapCategory(categoryID: number): string {
  return Category[categoryID] || 'Unknown Category';
}

const Products = () => {
  const store = useUserStore();
  let [valueSortOrder, setValueSortOrder] = useState('Price Desc.');
  let [catSortOrder, setCatSortOrder] = useState('All');
  // ! CHANGE TO DATABASE CALL FOR FINAL VERSION!!
  const { setProducts } = useProductsStore();


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://shastamart-api-deploy.vercel.app/api/products/getAllProducts');
        const productsData = await response.data;
        const transformedProducts = productsData.map(
          (product: ProductApiResponse) => ({
            productId: product.productID,
            name: product.productName,
            description: product.productDesc.split('. '),
            price: parseFloat(product.productPrice),
            stock: product.stockQuantity,
            category: mapCategory(product.categoryID),
            image: product.image,
            supplier: product.supplier,
            supplierStock: product.supplierStock,
            portion: product.portion,
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
  // const products = dummyProducts;
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
          ...p.filter((product) => !store.List.includes(product)),
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
              onValueChange={(e) => setCatSortOrder(e)}
            >
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
          {/* List of Product Items */}
          <div className="flex flex-row flex-wrap justify-center gap-7 pb-7">
            {orderedProducts.map((product, index) => (
              <ProductCard key={index} product={product} list />
            ))}
          </div>
          <ToastContainer />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
