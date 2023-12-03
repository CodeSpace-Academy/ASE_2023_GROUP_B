import Head from "next/head";
import { Fragment } from "react";
import path from 'path';
import HomeClient from "../components/home-page/HomeClient"

const fs = require('fs');

const Home = ({ hasEnvFile, hasKey }) => {

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
          <HomeClient hasEnvFile={hasEnvFile} hasKey={hasKey} />

        </div>
      </main>
    </Fragment>
  );
};

export default Home;

export async function getServerSideProps() {
  const envFilePath = path.resolve('.env');

  let hasEnvFile = false;
  let hasKey = false;
  try {
    await fs.promises.access(envFilePath);
    hasEnvFile = true;

    if (hasEnvFile) {
      const envContent = await fs.promises.readFile(envFilePath, 'utf8');
      hasKey = envContent.includes('MONGODB_CONNECTION_STRING');
    }
  } catch (error) {
    hasEnvFile = false;
  }

  return {
    props: {
      hasEnvFile,
      hasKey,
    },
  };
}