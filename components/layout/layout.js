import { Fragment } from 'react';

import Header from './header';

function Layout(props) {
  return (
    <Fragment>
      <Header />
      <main>{props.children}</main>
      <Footer/>
    </Fragment>
  );
}

export default Layout;
