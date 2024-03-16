import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button.tsx";

const Home = () => {
  return (
    <>
      <div className="flex h-screen flex-col overflow-y-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite font-poppins text-black">
        <Header />
        {/* Page Content */}
        <div className=" flex h-screen flex-col items-center text-pretty bg-transparent pt-[15rem] text-center">
          <h1 className="font-jua flex w-[80rem] flex-row text-pretty text-center text-[5rem]">
            Shop at ShastaMart for all your produce needs!
          </h1>
          {/* Buttons */}
          <div className="flex flex-row gap-6">
            <Button asChild className="" size="lg">
              <a href="/register">Register</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-primary bg-transparent"
              size="lg"
            >
              <a href="/login">Login</a>
            </Button>
          </div>
        </div>
        <div className="mx-[15rem] flex flex-row justify-around gap-10 pb-10">
          {/* Bus Card */}
          <div className="flex h-[35rem] w-[45rem] flex-col rounded-2xl bg-[#d9d9d9]">
            <img src="./assets/bus.svg" className="h-[15rem]" />
            <ul className="list-disc pl-32 pt-5 text-2xl">
              <li>Fast free delivery to your address, on us.</li>
              <li>Produce stays fresh in our refrigerated trucks.</li>
              <li>Always on time, or your money back.</li>
            </ul>
          </div>
          {/* Carrot Card */}
          <div className="flex h-[35rem] w-[45rem] flex-col rounded-2xl bg-[#d9d9d9]">
            <img src="./assets/carrot.svg" className="h-[15rem]" />
            <ul className="list-disc pl-32 pt-5 text-2xl">
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
