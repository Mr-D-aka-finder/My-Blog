import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../services";

const Header = () => {
  const [categories, setCategories] = useState([]);
  //categoriesを取得し、setCategoriesに格納
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
        <div className="hidden md:float-left md:contents">
          {categories.map((category: any, index) => (
            <Link key={index} href={`category/${category.slug}`}>
              <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
