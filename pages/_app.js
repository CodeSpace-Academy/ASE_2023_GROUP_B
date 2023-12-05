// pages/_app.js
import React from 'react';
import ErrorBoundary from '@/components/errorBoundary/ErrorBoundary';
import '@/styles/globals.css';
import Layout from '@/components/layout/layout';
import { FavoritesContextProvider } from '@/components/favorite/fav-context';

function MyApp({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <FavoritesContextProvider>
          <div>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </div>
        </FavoritesContextProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default MyApp;
