import Header from '@/components/Header';
import Footer from '@/components/Footer';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

import { useEffect, useState } from 'react';

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// import { Label } from '@/components/ui/label';

const Reports = () => {
  // * VARIABLES SECTION * //
  // ? Data Report Type Selector
  const [typeSelected, setTypeSelected] = useState('');

  // ? Inventory Variables
  const [filteredInventory, setFilteredInventory] = useState([]);

  // ? Sales Variables

  // ? Customer Insight Variables

  // * FUNCTIONS SECTION * //
  // ? Inventory Functions
  // function selectInventoryHandler(e: any) {
  //   console.log('Inventory Selected', e);
  // }

  // ? Sales Functions

  // ? Customer Insight Functions

  // * USEEFFECT SECTION * //
  // ? Data Report Type Selector UseEffect
  useEffect(() => {}, [typeSelected]);

  // ? Inventory UseEffect

  // ? Sales UseEffect

  // ? Customer Insight UseEffect

  // ! END OF HEADER SECTOIN ! //

  function renderReport(e: string) {
    switch (e) {
      //   * SAMPLE PAGE FOR THE REPORTS, EACH ONE NEEDS TO BE CUSTOMIZED
      case 'Inventory':
        return (
          <>
            <Table className="max-w-screen ml-0 rounded-lg bg-gray-50">
              <TableHeader>
                <TableRow>
                  <TableHead className="max-w-6 pl-6 text-gray-700">
                    Order Number
                  </TableHead>
                  <TableHead className="max-w-5 text-gray-700">Date</TableHead>
                  <TableHead className="max-w-5 text-gray-700">
                    Payment Method
                  </TableHead>
                  <TableHead className="max-w-5 text-gray-700">
                    Total Paid
                  </TableHead>
                  <TableHead className="max-w-5 text-gray-700">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item, index) => (
                  <TableRow
                    key={index}
                    onClick={() => setFilteredInventory(item)}>
                    <TableCell className="max-w-6 pl-6">
                      {/* {item.orderID} */}
                    </TableCell>
                    <TableCell className="max-w-6">
                      {/* {item.orderDate} */}
                    </TableCell>
                    <TableCell className="max-w-6">
                      {/* {item.paymentMethod} */}
                    </TableCell>
                    <TableCell className="max-w-6">
                      {/* {item.total.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })} */}
                    </TableCell>
                    <TableCell className="max-w-6">
                      <span className="text-green-500">Paid</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        );
      case 'Sales':
        return <></>;
      case 'CustomerInsight':
        return <></>;
      default:
        return <></>;
    }
  }

  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-bgwhite font-inter text-black">
        <Header color="blue" />
        <div className="flex w-screen flex-col">
          <h1 className="ml-16 pt-14 font-inter text-5xl font-medium text-black">
            Data Report
          </h1>
          {/* Report Type Functionality */}
          <div className="mt-5 flex gap-2 place-self-start pb-5">
            <h3 className="ml-6 items-center place-self-center font-inter text-lg font-medium">
              Type:{' '}
            </h3>
            {/* Report dropdown */}
            <Select
              defaultValue="Report Type"
              onValueChange={(e) => setTypeSelected(e)}>
              <SelectTrigger className="h-10 w-[8rem] bg-white text-black">
                <SelectValue placeholder="Select a Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sales">Sales Reports</SelectItem>
                <SelectItem value="Inventory">Inventory</SelectItem>
                <SelectItem value="CustomerInsight">
                  Customer Insights
                </SelectItem>
              </SelectContent>
            </Select>
            {typeSelected !== '' ? (
              renderReport(typeSelected)
            ) : (
              <h1>Please Select A Report</h1>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
  {
    /*             
          {sheetOpen ? (
            <div>
              <Sheet defaultOpen={true} onOpenChange={sheetCloseHandler}>
                <SheetContent side="right" className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Order #{selectedOrder}</SheetTitle>
                  </SheetHeader>
                  <SheetDescription asChild className="mb-3">
                    <div>
                      <div>Order Date: {orderToDisplay?.orderDate}</div>
                      <div>Payment Method: {orderToDisplay?.paymentMethod}</div>
                      <div>Order Status:</div>
                    </div>
                  </SheetDescription>
                  <Table className="ml-0 max-w-full rounded-lg bg-gray-50">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="max-w-6 pl-6 text-gray-700">
                          Product
                        </TableHead>
                        <TableHead className="max-w-5 text-gray-700">
                          Quantity
                        </TableHead>
                        <TableHead className="max-w-5 text-gray-700">
                          Price
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {orderToDisplay &&
                        orderToDisplay.items.map((product, index) => (
                          <TableRow key={index}>
                            <TableCell className="max-w-6 pl-6">
                              {product.productName}
                            </TableCell>
                            <TableCell className="max-w-5">
                              {product.quantity}
                            </TableCell>
                            <TableCell className="max-w-5">
                              {product.totalAmount.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                              })}
                            </TableCell>
                          </TableRow>
                        ))}
                      <Separator />
                      <TableRow>
                        <TableCell className="max-w-6 pl-6">Total</TableCell>
                        <TableCell
                          className=" max-w-9 p-0 pr-9 text-right"
                          colSpan={2}>
                          {orderToDisplay?.total.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          })}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </SheetContent>
              </Sheet>
            </div>
          ) : (
            <></>
          )} */
  }
};

export default Reports;
