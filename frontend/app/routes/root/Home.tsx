import React from "react";
import type { Route } from "../../+types/root";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mern-auth" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
const home = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-4'>
      <h2 className='text-sm md:text-2xl text-muted-foreground'>
        Authentication Build with MERN Stack
      </h2>
      <div className='flex gap-4'>
        <Link to='/sign-in'>
          <Button className='bg-blue-600 text-white cursor-pointer'>
            Login
          </Button>
        </Link>
        <Link to='/sign-up'>
          <Button
            variant={"outline"}
            className='bg-blue-500 text-white cursor-pointer'
          >
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default home;
