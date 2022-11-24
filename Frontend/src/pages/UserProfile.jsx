import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import Section, { SectionTitle, SectionBody } from "../components/Section";
import Helmet from "../components/Helmet";
import { logout } from "../redux/features/userSlice";
import Grid from "../components/Grid";

const profileCards = [
  {
    title: "Your orders",
    text: "Track, return, or buy things again",
    icon: <i className="bx bx-receipt"></i>,
    url: "/user-orders",
  },
  {
    title: "Login & security",
    text: "Edit login informations",
    icon: <i className="bx bx-id-card"></i>,
    url: "/update-user",
  },
  {
    title: "Your address",
    text: "Edit address for order",
    icon: <i className="bx bx-home"></i>,
    url: "/user-address",
  },
  {
    title: "Your payments",
    text: "Track, return, or buy things again",
    icon: <i className="bx bx-credit-card-alt"></i>,
    url: "/user-payment",
  },
];

const UserProfile = () => {
  const userLogin = useSelector((state) => state.userInfo);
  const { user } = userLogin;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined) {
      navigate("/login");
    }
  }, [navigate, user]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Helmet title="Profile">
      <Section>
        <SectionTitle>Hello {user ? user.name : null}</SectionTitle>
        <SectionBody>
          <Grid col={3} mdCol={2} smCol={2} gap={40}>
            {profileCards.map((item, index) => (
              <Link to={item.url} key={index}>
                <div className="profile-card">
                  <div className="profile-card__icon">{item.icon}</div>
                  <div className="profile-card__info">
                    <div className="profile-card__info__name">{item.title}</div>
                    <div className="policy-card__info__text">{item.text}</div>
                  </div>
                </div>
              </Link>
            ))}
            {user ? (
              user.isAdmin ? (
                <Link to={"/administrator"}>
                  <div className="profile-card">
                    <div className="profile-card__icon">
                      <i className="bx bx-server"></i>
                    </div>
                    <div className="profile-card__info">
                      <div className="profile-card__info__name">
                        Admin panel
                      </div>
                      <div className="policy-card__info__text">
                        Configure the products, users, etc
                      </div>
                    </div>
                  </div>
                </Link>
              ) : null
            ) : null}
            <div className="profile-card" onClick={logoutHandler}>
              <div className="profile-card__icon">
                <i className="bx bx-log-out"></i>
              </div>
              <div className="profile-card__info">
                <div className="profile-card__info__name">Logout</div>
                <div className="policy-card__info__text">
                  Sign out and end your session
                </div>
              </div>
            </div>
          </Grid>
        </SectionBody>
      </Section>
    </Helmet>
  );
};

export default UserProfile;
