import Head from 'next/head';
import React, { Fragment } from 'react';

/**
 * ContactForm Component
 * Renders a contact form with metadata for the page
 * @returns {JSX.Element} React component
 */
const ContactForm = () => {
  return (
    <Fragment>
      {/* Head component for managing metadata */}
      <Head>
        <title>Contact Form</title>
        <meta
          name="description"
          content="This is a contact form for your website."
        />
      </Head>
      {/* Heading for the contact form */}
      <h1>Contact Us!</h1>
      {/* Other components or form elements can be added here */}
    </Fragment>
  );
};

export default ContactForm;
