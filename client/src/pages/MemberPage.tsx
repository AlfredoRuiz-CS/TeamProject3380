import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const dummyPage = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite pb-10 font-inter text-black">
        <Header />
        <div className="flex w-full flex-col items-center gap-5 py-5">
          <h1 className="mb-10 mt-10 font-jua text-8xl ">
            You shop, We deliver
          </h1>
        </div>
        <div className="flex w-full flex-row items-start px-4">
          <div className="flex w-full">
            <img
              className="ml-10 rounded-[10px] object-cover"
              src="../assets/grocery.png"
              alt="You buy we deliver image"
            />
          </div>
          <div className="mr-10 flex w-1/3 flex-col justify-center pl-10 text-center font-jua">
            <div className="p-7 text-5xl">
              Save your time and money with ShastaMart
            </div>
            <div className="font-jua text-xl">
              Unlock the full potential of your shopping experience with our
              exclusive store membership! As a valued member, you'll enjoy the
              fastest delivery service available, ensuring your purchases arrive
              quicker than ever before. Plus, with the added benefit of free
              shipping on every order, you can shop to your heart's content
              without worrying about extra costs. Join our membership today and
              start enjoying these unparalleled benefits immediately. Welcome to
              a world where convenience and savings go hand in hand!
            </div>
            <button className="mt-7 flex h-auto w-full flex-grow items-center justify-center rounded-lg bg-indianred px-2 py-3 hover:bg-indianred/90">
              <a href="" className="text-[32px]">
                Get Membership
              </a>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default dummyPage;
