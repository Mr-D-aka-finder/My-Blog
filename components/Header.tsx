import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { getCategories } from "../services";

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((categories) => setCategories(categories));
  }, []);

  return (
    <div className="container mx-auto px-10 mb-8">
      {/* border-bottom-b 1px 横幅マックス、文字を強調、縦横幅py-8*/}
      <div className="border-b w-full inline-block border-black py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-black">
              Daiブログ
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
