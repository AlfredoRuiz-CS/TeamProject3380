import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <div className="flex h-screen flex-col overflow-y-hidden bg-bgwhite bg-gradient-to-b from-logoblue to-bgwhite font-poppins text-black">
        <Header />
        {/* Page Content */}
        <div className="h-screen bg-transparent text-center text-[10rem]">
          PLACEHOLDER
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
