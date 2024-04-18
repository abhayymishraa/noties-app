import Link from "next/link";
import React from "react";
import { ModeToggle } from "./themetoggle";
import { UserButton } from "@clerk/nextjs";

type Props = {};

const Navbar = async (props: Props) => {
  

  return (
    <nav className="w-full border-b bg-background h-[10vh] flex items-center">
      <div className="w-full flex items-center justify-between  px-20">
        <Link href="/">
          <h1 className="font-bold text-3xl ">NO
          <span className="text-primary">TI</span>
          ES</h1>
        </Link>
        <div className="flex items-center gap-x-4">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
