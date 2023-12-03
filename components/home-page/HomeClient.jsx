// components/HomeClient.js
import { Fragment, useState, useEffect } from "react";
import Link from "next/link";

const HomeClient = ({ hasEnvFile, hasKey }) => {
  const [checksPath, setCheckPath] = useState(null);

  useEffect(() => {
    setCheckPath(window.location.href.includes('localhost:'));
  }, []);

  if (checksPath) {
    if (!hasKey || !hasEnvFile) {
      return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <p>Oops! Something Went Wrong! The .env file is missing or has no value!</p>
        </div>
      );
    }
  }

  return (
    <Fragment>
      <h1 className="landingTitle">Rando Sando</h1>
          <div className="landingContent">
          <h2 className="title">Explore Food From Around the World!</h2>
          <p className="subtitle">
            Join Us to Discover Amazing Culinary Experiences!
          </p>
          <Link href="/recipe">
            <button className="btn">Explore</button>
          </Link>
          </div>
    </Fragment>
  );
};

export default HomeClient;
