// UI Imports
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { BsFillPersonLinesFill } from 'react-icons/bs';
// Functionality Imports

import useUserStore from '@/components/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const Profile = () => {
  const store = useUserStore();
  console.log(store);
  return (
    <>
      <div className="font-poppins flex min-h-screen flex-col overflow-x-hidden bg-bgwhite bg-gradient-to-b from-logoblue via-bgwhite to-bgwhite text-black">
        <Header />
        <div className="flex flex-grow flex-col items-center">
          <h1 className="flex flex-row self-center pt-28 font-jua text-6xl">
            Profile
          </h1>
          <BsFillPersonLinesFill className="h-[20rem] w-[20rem]" />
          <div className="pb-4 pt-2 font-jua text-6xl">{store.name}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
