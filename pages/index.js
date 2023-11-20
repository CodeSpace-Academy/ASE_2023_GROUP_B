import Link from "next/link";
import Head from "next/head";
import { Fragment } from "react";

const Home = () => {

  return (
    <Fragment>
      <Head>
        <title>Jahimost-V</title>
        <meta
          name="description"
          content="Explore food from around the world..."
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <main className="homeContainer">
        <div
          className="mainContent"
          style={{
            backgroundImage: `url('/landing.jpg')`,
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
        </div>
      </main>
    </Fragment>
  );
};

export default Home;
