import React from 'react';
import './Button.scss';

const Button = (props) => {
    return (
        <button 
        className={
            props.className ? 
            `button${ props.className}` : 
            "button"
        } 
        type={props.buttonType}
        >
            {props.buttonText}
        </button>
    );
};

export default Button;