import React from "react";
import Link from "next/link";
import Image from "next/image";
import classes from "./main-nav.module.css";
import { MdStars } from "react-icons/Md";
import { FaUser, FaEnvelope} from "react-icons/fa";
import {HiOutlineHeart} from "react-icons/Hi";

const MainNav = () => {
  return (
    <header className={classes.header}>
      <Link href="/" title="Home">
        <Image src="/Logo.png" alt="GroupB Logo" width={80} height={80} />
      </Link>
      <nav>
        <ul>
          <li>
            <Link className={classes.icon} href="/recipe">
              All Recipe
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
