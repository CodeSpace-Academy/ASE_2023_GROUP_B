import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import classes from "./main-nav.module.css";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { HiOutlineHeart } from "react-icons/hi";

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={classes.header}>
      <div className={classes.projectIcon}>
        <Link className={classes.logo} href="/" title="Home">
          <Image
            src="/groupb_logo.png"
            alt="GroupB Logo"
            width={100}
            height={100}
          />
        </Link>
      </div>

      <nav className={classes.nav}>
        <div
          className={`${classes.burgerMenu} ${
            isOpen ? classes.burgerMenuOpen : ""
          }`}
          onClick={toggleMenu}
        >
          <div className={classes.burgerIcon}>
            <div className={classes.bar1}></div>
            <div className={classes.bar2}></div>
            <div className={classes.bar3}></div>
          </div>

          <div className={classes.menu}>
            <ul>
              <Link className={classes.recipes} href="/recipe">
                All Recipes
              </Link>

              <li>
                <Link
                  className={classes.icon}
                  href="/recipe/AboutUs"
                  title="About us"
                >
                  <FaUser />
                </Link>
              </li>

              <li>
                <Link
                  className={classes.icon}
                  href="/recipe/Contact"
                  title="Contact"
                >
                  <FaEnvelope />
                </Link>
              </li>

              <li>
                <Link
                  className={classes.icon}
                  href="/recipe/favoritePage"
                  title="Favorite"
                >
                  <HiOutlineHeart />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MainNav;