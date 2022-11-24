import React from "react";

import Helmet from "../components/Helmet";
import BuildingComponent from "../components/BuildingComponent";

const About = () => {
  return (
    <Helmet title="About">
      <BuildingComponent name="About" />
    </Helmet>
  );
};

export default About;
