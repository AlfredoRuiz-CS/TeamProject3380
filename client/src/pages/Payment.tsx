import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { productItem } from '@/components/store';
import { useParams } from 'react-router-dom';
import React from 'react';

interface paymentProps {
  type: 'cart' | 'membership';
}

const payment = (props: paymentProps) => {
  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite font-inter text-black">
        <Header />
      </div>
      <Footer />
    </>
  );
};

export default payment;
