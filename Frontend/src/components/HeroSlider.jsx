import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Button from "./Button";

const HeroSlider = (props) => {
  const data = props.data;

  const timeOut = props.timeOut ? props.timeOut : 3000;

  const getBannersIds = useCallback(() => {
    let IDs = [];
    for (let i = 0; i < data.length; i++) {
      IDs.push(data[i].id);
    }
    return IDs;
  }, [data]);

  const [activeSlide, setActiveSlide] = useState(getBannersIds()[0]);

  const nextSlide = useCallback(() => {
    const index =
      getBannersIds().indexOf(activeSlide) + 1 === data.length
        ? 0
        : getBannersIds().indexOf(activeSlide) + 1;
    setActiveSlide(getBannersIds()[index]);
  }, [activeSlide, data, getBannersIds]);

  const prevSlide = () => {
    const index =
      getBannersIds().indexOf(activeSlide) - 1 < 0
        ? data.length - 1
        : getBannersIds().indexOf(activeSlide) - 1;
    setActiveSlide(getBannersIds()[index]);
  };

  useEffect(() => {
    if (props.auto) {
      const slideAuto = setInterval(() => {
        nextSlide();
      }, timeOut);
      return () => {
        clearInterval(slideAuto);
      };
    }
  }, [nextSlide, timeOut, props]);

  return (
    <div className="hero-slider">
      {data.map((item) => (
        <HeroSliderItems
          key={item.id}
          item={item}
          active={item.id === activeSlide}
        />
      ))}
      {props.control ? (
        <div className="hero-slider__control">
          <div className="hero-slider__control__item" onClick={prevSlide}>
            <i className="bx bx-chevron-left"></i>
          </div>
          <div className="hero-slider__control__item">
            <div className="index">
              {getBannersIds().indexOf(activeSlide) + 1}/{data.length}
            </div>
          </div>
          <div className="hero-slider__control__item" onClick={nextSlide}>
            <i className="bx bx-chevron-right"></i>
          </div>
        </div>
      ) : null}
    </div>
  );
};

HeroSlider.propTypes = {
  data: PropTypes.array.isRequired,
  control: PropTypes.bool,
  auto: PropTypes.bool,
  timeOut: PropTypes.number,
};

const HeroSliderItems = (props) => (
  <div className={`hero-slider__item ${props.active ? "active" : ""}`}>
    <div className="hero-slider__item__info">
      <div
        className={`hero-slider__item__info__title color-${props.item.color}`}
      >
        <span>{props.item.title}</span>
      </div>
      <div className="hero-slider__item__info__description">
        <span>{props.item.description}</span>
      </div>
      <div className="hero-slider__item__info__btn">
        <Link to={props.item.path}>
          <Button
            backgroundColor={props.item.color}
            icon="bx bx-search"
            animated={true}
          >
            more details
          </Button>
        </Link>
      </div>
    </div>
    <div className="hero-slider__item__image">
      <div className={`shape bg-${props.item.color}`}></div>
      <img src={props.item.img} alt="" />
    </div>
  </div>
);

export default HeroSlider;
