import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <div className="flex justify-center space-x-2  text-lg">
        <Link href="/"><h1 className="underline">Home</h1></Link>
        <h1 className="no-underline">/</h1>
        <Link href="/dash"><h1 className="underline">Dashboard</h1></Link>
      </div>
    </nav>
  );
};

export default Navbar;
