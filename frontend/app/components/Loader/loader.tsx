import { CircleEllipsis, LoaderCircle, LoaderPinwheel } from "lucide-react";
import React from "react";

const LoaderIcon = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <LoaderCircle className='animate-spin' size={35} />
    </div>
  );
};

export default LoaderIcon;
