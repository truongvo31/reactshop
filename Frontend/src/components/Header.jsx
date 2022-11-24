import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Logo from "../assets/logo.svg";

const mainNav = [
  {
    display: "Homepage",
    path: "/",
  },
  {
    display: "Products",
    path: "/catalog",
  },
  {
    display: "About",
    path: "/about",
  },
  {
    display: "Contact",
    path: "/contact",
  },
];

const Header = () => {
  const userLogin = useSelector((state) => state.userInfo.user);
  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((i) => i.path === pathname);

  const headerRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

  // useEffect(() => {
  //   if (userLogin === undefined && userRegister === undefined) {
  //     setActiveUser(undefined);
  //   } else {
  //     if (userLogin !== undefined) {
  //       setActiveUser(userLogin);
  //     } else {
  //       if (userRegister !== undefined) {
  //         setActiveUser(userRegister);
  //       }
  //     }
  //   }
  // }, [userLogin, userRegister]);

  const menuLeft = useRef(null);

  const menuToggle = () => menuLeft.current.classList.toggle("active");
  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <div className="header__logo">
          <Link to="/" aria-label="Homepage">
            <img src={Logo} alt="" />
            <span>React</span>
          </Link>
        </div>
        <div className="header__menu">
          <div className="header__menu__mobile-toggle" onClick={menuToggle}>
            <i className="bx bx-menu-alt-left"></i>
          </div>
          <div className="header__menu__left" ref={menuLeft}>
            <div className="header__menu__left-close" onClick={menuToggle}>
              <i className="bx bx-chevron-left"></i>
            </div>
            {mainNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${
                  index === activeNav ? "active" : ""
                }`}
                onClick={menuToggle}
              >
                <Link to={item.path}>
                  <span>{item.display}</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="header__menu__right">
            <div className="header__menu__item header__menu__right__item">
              <i className="bx bx-search"></i>
            </div>
            <div className="header__menu__item header__menu__right__item">
              <Link to="/cart">
                <i className="bx bx-shopping-bag"></i>
              </Link>
            </div>
            <div className="header__menu__item header__menu__right__item">
              <Link to={userLogin ? "/userprofile" : "/login"}>
                <i className="bx bx-user"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
