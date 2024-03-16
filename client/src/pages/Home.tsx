import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <div className="flex h-screen flex-col bg-bgwhite bg-gradient-to-b from-logoblue to-bgwhite font-poppins text-black">
        <Header />
        {/* Page Content */}
        <div className="h-screen bg-transparent text-center">PLACEHOLDER</div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
