import { Fragment } from 'react';

import MainNav from './main-nav';
import Footer from '../footer/footer';

function Layout(props) {
  return (
    <Fragment>
      <MainNav />
      <main>{props.children}</main>
      <Footer/>
    </Fragment>
  );
}

export default Layout;
