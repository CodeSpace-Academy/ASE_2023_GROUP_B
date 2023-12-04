import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import classes from "./main-nav.module.css";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { HiOutlineHeart } from "react-icons/hi";

const MainNav = () => {
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Fetch the count of favorites when the component mounts
    const fetchFavoritesCount = async () => {
      try {
        const response = await fetch('/api/backend/favoritesCount');
        const data = await response.json();
        setFavoritesCount(data.count);
      } catch (error) {
        console.error('Error fetching favorites count:', error);
      }
    };

    fetchFavoritesCount();
  }, []);

  const updateFavoritesCount = async () => {
    try {
      const response = await fetch('/api/backend/favoritesCount');
      const data = await response.json();
      setFavoritesCount(data.count);
    } catch (error) {
      console.error('Error updating favorites count:', error);
    }
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
            isOpen ? classes.burgerMenuOpen : ''
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
              <li>
                <Link className={classes.recipes} href="/recipe">
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
                {/* Display the favorite icon with the count */}
                <Link
                  className={classes.Favicon}
                  href="/recipe/favoritePage"
                  title="Favorite"
                >
                  <div>
                    <HiOutlineHeart />
                    {favoritesCount > 0 && (
                      <span className={classes.favoritesCount}>
                        {favoritesCount}
                      </span>
                    )}
                  </div>
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
