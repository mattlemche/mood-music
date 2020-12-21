import React from 'react';
import './Header.scss'
import { Link } from 'react-router-dom';
import Logo from "../Logo/Logo";

const Header = () => {
    return (
        <header className="header">
            <Link exact="true" to="/">
                <Logo logoClass="logo__icon--header" containerClass="logo--header"/>
            </Link>
        </header>
    );
};

export default Header;