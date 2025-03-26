"use client";
import gif from "./assets/images/logo.gif";

const Test = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full h-screen">
      <div className="hidden lg:block w-full relative">
        <img src={gif} className=" w-full h-full object-contain p-20" alt="Cover Photo" />
      </div>
    </div>
  );
};

export default Test;
