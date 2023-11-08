import React from "react";
import Link from "next/link";
import Image from "next/image";
import classes from "./main-nav.module.css";
import { MdStars } from "react-icons/md";
import { FaUser, FaEnvelope} from "react-icons/fa";
import {HiOutlineHeart} from "react-icons/hi";

const MainNav = () => {
  return (
    <header className={classes.header}>
        <div className={classes.icon}>
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
        <ul>
          <li>
            <Link className={classes.icon} href="/recipe">
              All Recipes
            </Link>
          </li>

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
              <HiOutlineHeart/>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNav;
