import React from "react";
import { HashRouter } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import Approutes from "../routes/Routes";

const Layout = () => {
  return (
    <HashRouter>
      <>
        <Header />
        <div className="container">
          <div className="main">
            <Approutes />
          </div>
        </div>
        <Footer />
        {/* <ProductViewModal /> */}
      </>
    </HashRouter>
  );
};

export default Layout;
