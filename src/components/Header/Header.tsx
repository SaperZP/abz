import React, {FC} from 'react';
import './Header.scss';
import logo from '../../assets/logo.svg';

interface HeaderProps {
}

const Header: FC<HeaderProps> = () => (
    <header className="header">
      <div className="header__top-bar">
        <a href="/abz" className="header__logo">
          <img src={logo} alt="logo"/>
        </a>
        <nav className="header__nav">
          <ul className="header__list">
            <li className="header__item">
              <a href="#users" className="header__nav-link button">Users</a>
            </li>

            <li className="header__item">
              <a href="#signup" className="header__nav-link button">Sign up</a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="header__content App__container--exclude">
        <div className="App__wrapper">
          <h1 className="page__title header__title">
            Test assignment for front-end developer
          </h1>

          <p className="header__text">
            What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a
            vast understanding of User design thinking as they'll be building web interfaces with accessibility
            in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
          </p>

          <a href="#signup" className="header__cta button">Sign up</a>
        </div>
      </div>
    </header>
);

export default Header;
