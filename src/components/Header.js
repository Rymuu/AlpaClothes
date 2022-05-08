import React, { useEffect } from "react";
import Link from "next/link";
import Logo from "../public/alpaga.png";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Header = () => {
  return (
    <>
      <header className="header__main">
        <div className="header__logo">
          <img src={Logo.src} alt="AlpaClothes" />
        </div>
        <nav className="header__nav">
          <ul className="nav__list">
            <li className="nav__item">
              <Link href="/">
                <a className="nav__link">Home</a>
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/about">
                <a className="nav__link">About</a>
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/shop">
                <a className="nav__link">Shop</a>
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/blog">
                <a className="nav__link">Blog</a>
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/sale">
                <a className="nav__link">Sale</a>
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/search">
                <a className="nav__link"><SearchOutlinedIcon/></a>
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/cart">
                <a className="nav__link"><ShoppingBagOutlinedIcon/></a>
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/login">
                <a className="nav__link"><AccountCircleOutlinedIcon/></a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="header__separation">
      </div>
    </>

  );
};

export default Header;