import Header from '@/components/Header';
import Footer from '@/components/Footer';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { productItem } from '@/components/store';

const dummyProduct: productItem = {
  productId: 12345,
  name: 'Fresh Strawberries',
  price: 3.97,
  image: '/assets/strawberries.jpg',
  stock: 10,
  portion: 'lb.',
  supplier: 'Berry Farms',
  supplierStock: 100,
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
const dummyProducts: productItem[] = Array(100)
  .fill({})
  .map(() => ({
    ...dummyProduct,
  }));
dummyProducts[4].stock = 2;
dummyProducts[6].stock = 0;

const AdminDashboard = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite font-inter text-black">
        <Header />
        <div className="flex flex-row">
          <div className="flex flex-col">
            {/* Individual Item Stock Table */}
            <div className="flex w-screen flex-col">
              <h1 className="mb-4 ml-20 mt-16 text-4xl text-white">
                Individual Item Stock
              </h1>
              <Table className="ml-20 min-h-[20rem] w-1/2 rounded-xl bg-cardwhite pl-10">
                <TableHeader>
                  <TableRow>
                    <TableHead className="max-w-6">ProductID</TableHead>
                    <TableHead className="max-w-6">Current Status</TableHead>
                    <TableHead className="max-w-6">
                      Value In Inventory
                    </TableHead>
                    <TableHead className="max-w-6">Supplier Stock</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyProducts.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell className="max-w-6">
                        {product.productId}
                      </TableCell>
                      <TableCell className="max-w-6">
                        {product.stock > 3 ? (
                          <p className="text-lg text-green-400">Good</p>
                        ) : product.stock > 0 ? (
                          <p className="text-lg text-yellow-500">Low</p>
                        ) : (
                          <p className="text-lg text-red-400">Bad</p>
                        )}
                      </TableCell>
                      <TableCell className="max-w-6">{product.stock}</TableCell>
                      <TableCell className="max-w-6">{product.stock}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
