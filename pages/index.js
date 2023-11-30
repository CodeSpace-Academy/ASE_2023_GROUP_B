import Link from "next/link";
import Head from "next/head";
import { Fragment, useState, useEffect } from "react";
import path from 'path';
import LoadSpinner from '@/components/loading/LoadSpinner';
import { useRouter } from 'next/router';
import ErrorMessage from '@/components/errorMessage/ErrorMessage';

const fs = require('fs');

const Home = ({ hasEnvFile, hasKey }) => {
  const [checksPath, setCheckPath] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setCheckPath(window.location.href.includes('localhost:'));
  }, []);

  const handleExploreClick = () => {
    setLoading(true); 

    setTimeout(() => {
      setLoading(false);
      router.push('/recipe');
    }, 2000);
  };


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
            <button className="btn" onClick={handleExploreClick} disabled={loading}>
            {loading ? <LoadSpinner /> : 'Explore'}
            </button>
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <ErrorMessage />
        </div>
          </Link>
        </div>
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