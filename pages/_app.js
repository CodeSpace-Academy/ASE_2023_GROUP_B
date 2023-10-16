import "@/styles/globals.css";
import Head from "next/head";
import Layout from "@/components/layout/layout";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>My Recipes</title>
        <meta
          name="description"
          content="Explore food from around the world..."
        />
        <link rel="icon" type="image/png" href="/recipe-book (1).png" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
