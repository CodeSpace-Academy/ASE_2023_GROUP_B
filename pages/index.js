import Link from "next/link";
import Head from "next/head";
import { Fragment, useState, useEffect } from "react";

const Home = () => {
  const [envCheck, setEnvCheck] = useState({ envFileExists: false, hasConnectionString: false });

  useEffect(() => {
    fetch("/api/env-check")
      .then((response) => response.json())
      .then((data) => setEnvCheck(data))
      .catch((error) => {
        console.error("Error checking environment:", error);
        setEnvCheck({ envFileExists: false, hasConnectionString: false });
      });
  }, []);

  if (!envCheck.envFileExists || !envCheck.hasConnectionString) {
    return (
      <div>
        <h1>Error</h1>
        <p>The .env file is missing or incomplete.</p>
      </div>
    );
  }


  return (
    <Fragment>
      <Head>
        <title>All Recipes</title>
        <meta
          name="description"
          content="Explore food from around the world..."
        />
        <link rel="icon" type="image/png" href="/recipe-book (1).png" />
      </Head>

      <main className="homeContainer">
        <div
          className="mainContent"
          style={{
            backgroundImage: `url('/spices-black.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            position: "relative",
            height: "100vh",
            margin: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            color: "white",
          }}
        >
          <h2 className="title">Explore food from around the world</h2>
          <p className="subtitle">
            Join us to discover amazing culinary experiences!
          </p>
          <Link href="/recipe">
            <button className="btn">Explore</button>
          </Link>
        </div>
      </main>
    </Fragment>
  );
};

export default Home;
