import Header from '@/components/Header';
import Footer from '@/components/Footer';
// import { Supplier } from "@/components/store";
import { useSupplierStore } from '@/components/store';
import { useEffect /*, useState*/ } from 'react';
import axios from 'axios';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
// } from '@/components/ui/sheet';

const Suppliers = () => {
  const { setSuppliers } = useSupplierStore();
  // const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(
          'https://shastamart-api-deploy.vercel.app/api/suppliers/getAllSuppliers'
        );
        const supplierData = response.data;
        setSuppliers(supplierData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSuppliers();
  }, [setSuppliers]);
  // useEffect(() => {}, [sheetOpen]);

  const suppliers = useSupplierStore((state) => state.suppliers);

  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-bgwhite font-inter text-black">
        <Header color="blue" />
        <div className="flex w-screen flex-col">
          <h1 className="ml-16 pt-14 font-inter text-5xl font-medium text-black">
            Supplier Information
          </h1>

          <Table className="max-w-screen ml-0 mt-5 rounded-lg bg-gray-50">
            <TableHeader>
              <TableRow>
                <TableHead className="max-w-6 pl-6 text-gray-700">
                  Supplier Number
                </TableHead>
                <TableHead className="max-w-5 text-gray-700">Name</TableHead>
                <TableHead className="max-w-5 text-gray-700">
                  Phone Number
                </TableHead>
                <TableHead className="max-w-5 text-gray-700">
                  Street Address
                </TableHead>
                <TableHead className="max-w-5 text-gray-700">City</TableHead>
                <TableHead className="max-w-5 text-gray-700">State</TableHead>
                <TableHead className="max-w-5 text-gray-700">Zipcode</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier, index) => (
                <TableRow key={index}>
                  <TableCell className="max-w-6 pl-6">
                    {supplier.supplierID}
                  </TableCell>
                  <TableCell className="max-w-6">{supplier.name}</TableCell>
                  <TableCell className="max-w-6">
                    {supplier.phoneNumber}
                  </TableCell>
                  <TableCell className="max-w-6">
                    {supplier.streetAddress}
                  </TableCell>
                  <TableCell className="max-w-6">{supplier.city}</TableCell>
                  <TableCell className="max-w-6">{supplier.state}</TableCell>
                  <TableCell className="max-w-6">{supplier.zipcode}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Suppliers;
