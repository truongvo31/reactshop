import React from "react";
import { Link } from "react-router-dom";

import Grid from "./Grid";

import Logo from "../assets/react-logo.png";

const footerAboutLinks = [
  {
    display: "About Me",
    path: "/about",
  },
  {
    display: "Contact",
    path: "/contact",
  },
  {
    display: "Recruit",
    path: "/recruit",
  },
  {
    display: "News",
    path: "/news",
  },
  {
    display: "Stores",
    path: "/stores",
  },
];

const footerCustomerLinks = [
  {
    display: "Return policy",
    path: "/return-policy",
  },
  {
    display: "Warranty",
    path: "/warranty",
  },
  {
    display: "Refund policy",
    path: "/refund-policy",
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <Grid col={4} mdCol={2} smCol={1} gap={10}>
          <div>
            <div className="footer__title">Hotlines</div>
            <div className="footer__content">
              <p>
                Contact to order: <strong>0123456789</strong>
              </p>
              <p>
                Order inquiries: <strong>0123456789</strong>
              </p>
              <p>
                Suggestions, complaints: <strong>0123456789</strong>
              </p>
            </div>
          </div>
          <div>
            <div className="footer__title">About Yolo</div>
            <div className="footer__content">
              {footerAboutLinks.map((item, index) => (
                <p key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </p>
              ))}
            </div>
          </div>
          <div>
            <div className="footer__title">Customer services</div>
            <div className="footer__content">
              {footerCustomerLinks.map((item, index) => (
                <p key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </p>
              ))}
            </div>
          </div>
          <div className="footer__about">
            <p>
              <Link to={"/"}>
                <img src={Logo} alt="" className="footer__logo" />
              </Link>
            </p>
            <p>
              ReactJS is a declarative, efficient, and flexible JavaScript
              library for building reusable UI components. It is an open-source,
              component-based front end library responsible only for the view
              layer of the application. It was created by Jordan Walke, who was
              a software engineer at Facebook.
            </p>
          </div>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
