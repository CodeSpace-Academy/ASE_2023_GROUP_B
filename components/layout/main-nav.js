import React from "react";
import Link from "next/link";
import Image from "next/image";
import classes from "./main-nav.module.css";
import { FaUser, FaEnvelope } from "react-icons/fa";

const MainNav = () => {
  return (
    <header className={classes.header}>
        <div className={classes.icon}>
        <Link className={classes.icon} href="/" title="Home">
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
            <Link className={classes.icon} href="/about-us" title="About us">
              <FaUser />
            </Link>
          </li>
          <li>
            <Link
              className={classes.icon}
              href="/contact/contact-form"
              title="Contact"
            >
              <FaEnvelope />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNav;
