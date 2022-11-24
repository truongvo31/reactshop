import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Button from "./Button";

const prepareForm = (formArr) => {
  return formArr.reduce((key, value) => ({ ...key, [value.name]: "" }), {});
};

const Form = (props) => {
  const initialForm = prepareForm(props.formArr);
  const [form, setForm] = useState(initialForm);

  const onChangeHandler = (e) =>
    setForm((previous) => ({ ...previous, [e.target.name]: e.target.value }));

  const onSubmitHandler = () => {
    props.onSubmit(form, () => setForm(initialForm));
  };

  const onKeyHandler = (e) => {
    if (e.key === "Enter") {
      props.onSubmit(form, () => setForm(initialForm));
    }
  };

  return (
    <div className="form">
      <div className="form__wrapper">
        <span className="form__title">{props.title}</span>
        {props.error ? (
          <span className="form__error">{props.error}</span>
        ) : null}
        {props.formArr.map((item, index) => (
          <div className="form__control" key={index}>
            <label className="form__control__label" htmlFor={item.name}>
              {item.label}
            </label>
            <input
              className="form__control__input"
              type={item.type}
              placeholder={item.placeholder}
              id={item.name}
              name={item.name}
              value={form[item.name]}
              onChange={(e) => onChangeHandler(e)}
              onKeyDown={(e) => onKeyHandler(e)}
              required
            />
          </div>
        ))}
        <div className="form__button">
          <Button
            onClick={() => {
              onSubmitHandler();
            }}
          >
            {props.submitBtn}
          </Button>
        </div>
        <div className="form__redirect">
          <span className="form__redirect__label">
            {props.redirect.label}&nbsp;
          </span>
          <div className="form__redirect__link">
            <Link to={props.redirect.link.to}>{props.redirect.link.label}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Form.propTypes = {
  title: PropTypes.string,
  formArr: PropTypes.array,
  submitBtn: PropTypes.string,
  onSubmit: PropTypes.func,
  redirect: PropTypes.object,
  error: PropTypes.string,
};

// Form.defaultProps = {
//   onSubmit: (form) => console.log(form),
// };

export default Form;
