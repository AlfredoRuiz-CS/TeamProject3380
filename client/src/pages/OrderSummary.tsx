import Header from '@/components/Header';
import Footer from '@/components/Footer';

// import useUserStore from '@/components/store';
// import { productItem } from '@/components/store';

const OrderSummary = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite font-inter text-black">
        <Header />
      </div>
      <Footer />
    </>
  );
};

export default OrderSummary;
