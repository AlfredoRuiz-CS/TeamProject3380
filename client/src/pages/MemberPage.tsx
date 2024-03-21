import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const dummyPage=()=>{
    return(
        <>
       <div className="flex min-h-screen flex-col overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite pb-10 font-inter text-black">
                <Header />
                <div className="flex w-full flex-col items-center gap-5 py-5">
                    <h1 className="mt-10 mb-10 font-jua text-8xl ">
                        You shop, We deliver
                    </h1>
                </div>
                <div className='flex flex-row items-start w-full px-4'>
                    <div className='w-full'>
                        <img
                            className='rounded-[10px] object-cover pl-10'
                            src='../assets/grocery.png'
                            alt='You buy we deliver image'
                        />
                    </div>
                    <div className='flex flex-col justify-center w-1/3 font-jua text-center pl-10'>
                        <div className='text-5xl p-7'>Save your time and money with ShastaMart</div>
                        <div className='text-xl font-jua'>Unlock the full potential of your shopping experience with our exclusive store membership! As a valued member, you'll enjoy the fastest delivery service available, ensuring your purchases arrive quicker than ever before. Plus, with the added benefit of free shipping on every order, you can shop to your heart's content without worrying about extra costs. Join our membership today and start enjoying these unparalleled benefits immediately. Welcome to a world where convenience and savings go hand in hand!</div>
                        <button className="flex h-auto mt-7 w-full flex-grow items-center justify-center rounded-lg bg-[#da6e62] px-2 py-3">
                            <a href='' className='text-[32px]'>Get Membership</a>
                        </button>
                    </div>
                </div>
                <Footer/>
            </div>
    </>
    )
}

export default dummyPage
