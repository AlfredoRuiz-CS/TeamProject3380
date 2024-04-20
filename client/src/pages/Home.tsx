import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button.tsx';
import useUserStore from '@/components/store';
import { Link } from 'react-router-dom';

const Home = () => {
  const user = useUserStore();
  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite font-inter text-black">
        <Header />
        {/* Page Content */}
        <div className=" flex flex-col items-center text-pretty bg-transparent pb-[15rem] pt-4 text-center lg:pt-[10rem]">
          <h1 className="flex w-[80rem] flex-row text-pretty text-center font-jua text-[5rem] ">
            Shop at ShastaMart for all your produce needs!
          </h1>
          {/* Buttons */}
          {user.loggedIn ? (
            <Button asChild className="" size="lg">
              <Link to="/products">Start Shopping</Link>
            </Button>
          ) : (
            <div className="mb-2 mt-6 flex flex-row gap-6 lg:mb-12">
              <Button
                asChild
                variant="outline"
                className="border-primary bg-transparent"
                size="lg">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="" size="lg">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
        <div className="mx-auto flex flex-row justify-around gap-10 pb-10">
          {/* Bus Card */}
          <div className="flex h-[23rem] min-w-64 flex-col rounded-2xl bg-[#d9d9d9] lg:min-w-[45rem]">
            <img src="./assets/bus.svg" className="h-10 lg:h-[15rem]" />
            <ul className="list-disc pl-10 text-lg lg:pl-32 lg:text-2xl">
              <li>Fast free delivery to your address, on us.</li>
              <li>Produce stays fresh in our refrigerated trucks.</li>
              <li>Always on time, or your money back.</li>
            </ul>
          </div>
          {/* Carrot Card */}
          <div className="flex h-[23rem] min-w-[45rem] flex-col rounded-2xl bg-[#d9d9d9]">
            <img src="./assets/carrot.svg" className="h-10 lg:h-[15rem]" />
            <ul className="list-disc pl-32 text-lg lg:text-2xl">
              <li>Dozens of grocery items to choose from.</li>
              <li>Organic and locally sourced.</li>
              <li>11-time award winning flavor of products.</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
