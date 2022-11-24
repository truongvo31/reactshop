import React from "react";
import PropTypes from "prop-types";

import Grid from "./Grid";

const brand = (props) => {
  const data = props.data;
  return (
    <Grid col={5} mdCol={5} smCol={2} gap={20}>
      {data.map((item) => (
        <div className="brand__img" key={item.brandID}>
          <img src={item.image} alt="" />
        </div>
      ))}
    </Grid>
  );
};

brand.propTypes = {
  data: PropTypes.array.isRequired,
};

export default brand;
