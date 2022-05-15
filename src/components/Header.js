import React, { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "../public/alpaga-icon.png";
import AlpaClothes from "../public/AlpaClothes.jpg";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useRouter } from "next/router";

const Header = () => {
  const [token, setToken] = useState(typeof window !== "undefined" ? localStorage.getItem("jwt") : []);

  useEffect(() => {
    setToken(localStorage.getItem("jwt"));
  }, []);


  const router = useRouter();

  return (
    <>
      <header className="header__main">
        <div className="header__img" onClick={(e) => router.push("/")}>
          <img src={Logo.src} alt="AlpaClothes" className="header__img__logo" />
          <img src={AlpaClothes.src} alt="AlpaClothes" className="header__img__name" />
        </div>
        <nav className="header__nav">
          <ul className="nav__list">
            <li className="nav__item">
              <Link href="/">
                {router.asPath === "/" ?
                  (<a className="nav__link__colored">Home</a>)
                  :
                  (<a className="nav__link">Home</a>)}
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/shop">
                {router.asPath === "/shop" ?
                  (<a className="nav__link__colored">Shop</a>)
                  :
                  (<a className="nav__link">Shop</a>)}
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/blog">
                {router.asPath === "/blog" ?
                  (<a className="nav__link__colored">Blog</a>)
                  :
                  (<a className="nav__link">Blog</a>)}
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/sale">
                {router.asPath === "/sale" ?
                  (<a className="nav__link__colored">Sale</a>)
                  :
                  (<a className="nav__link">Sale</a>)}
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/about">
                {router.asPath === "/about" ?
                  (<a className="nav__link__colored">About</a>)
                  :
                  (<a className="nav__link">About</a>)}
              </Link>
            </li>
          </ul>
        </nav>
        <nav className="header__nav">
          <ul className="nav__list">
            <li className="nav__item">
              <Link href="/search">
                <a className="nav__link"><SearchOutlinedIcon /></a>
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/cart">
                <a className="nav__link"><ShoppingBagOutlinedIcon /></a>
              </Link>
            </li>
            <li className="nav__item">
              <div className="dropdown">
                <Link href="/account">
                  <a className="nav__link"><AccountCircleOutlinedIcon /></a>
                </Link>
                <div className="dropdown-content">
                  <a href="/login">Login</a>
                  <a href="/register">Create an account</a>
                </div>
              </div>
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