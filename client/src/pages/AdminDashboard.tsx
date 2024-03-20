import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AdminDashboard = () => {
  return (
    <>
      <div className="font-poppins flex min-h-screen flex-col overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite text-black">
        <Header />
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
