import { productItem } from '@/components/store';
import { useParams } from 'react-router-dom';
import React from 'react';

interface paymentProps {
  type: 'cart' | 'membership';
}

const payment = (props: paymentProps) => {
  return (
    <>
      <div className=""></div>
    </>
  );
};

export default payment;
