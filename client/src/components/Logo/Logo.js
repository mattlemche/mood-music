import React from 'react';
import { ReactComponent as LogoIcon } from '../../assets/logo/moody-logo.svg'
import './Logo.scss';

const Logo = (props) => {
    return (
        <div className={props.containerClass ? `logo ${props.containerClass}` : "logo"}>
            <LogoIcon className={props.logoClass ? `logo__icon ${props.logoClass}` : "logo__icon"}/>
        </div>
    )
}

export default Logo;