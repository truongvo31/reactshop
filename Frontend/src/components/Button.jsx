import React from 'react'
import PropTypes from 'prop-types'

const Button = props => {

    const bg = props.backgroundColor ? 'bg-' + props.backgroundColor : 'bg-main';
    const size = props.size ? 'btn-' + props.size : '';
    const animated = props.animated ? 'btn-animated' : '';


  return (
      <button className={`btn ${bg} ${size} ${animated}`} onClick={props.onClick ? () => props.onClick() : null}>
        <span className="btn__text">{props.children}</span>
        {
            props.icon ? (
                <span className='btn__icon'><i className={`${props.icon} bx-tada`}></i></span>
            ) : null
        }
      </button>
  )
}

Button.propTypes = {
    backgroundColor : PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.string,
    animated: PropTypes.bool,
    onClick: PropTypes.func,
}

export default Button