import React, { useState, useEffect } from "react";
import { Layout } from "../components";
import "tailwindcss/tailwind.css";
import "../styles/globals.scss";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </>
  );
}

export default MyApp;
