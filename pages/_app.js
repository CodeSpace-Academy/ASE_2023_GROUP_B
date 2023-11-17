import "@/styles/globals.css";
import Layout from "@/components/layout/layout";
import { FavoritesContextProvider } from "@/components/favorite/fav-context";

export default function App({ Component, pageProps }) {
  return (
    <FavoritesContextProvider>
      <div>
      <Layout>
      <Component {...pageProps} />
    </Layout>
      </div>
    </FavoritesContextProvider>
  );
}