import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export const Home = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center gap-4'>
      <h2 className='text-2xl mb-2 text-semibold'>
        Authentication Build with MERN
      </h2>
      <Link to='/sign-in'>
        <Button className='bg-blue-500 text-white'>Login</Button>
      </Link>
      <Link to='/sign-up'>
        <Button variant={"outline"} className='bg-blue-500 text-white'>
          Sign Up
        </Button>
      </Link>
    </div>
  );
};
