import React from "react";
import Header from "./Header";

type Child = {
  children: React.ReactNode;
};

const Layout = ({ children }: Child) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
