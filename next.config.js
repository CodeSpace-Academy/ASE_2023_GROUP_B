const nextConfig = {
  reactStrictMode: true,
  env: {
    // This will ensure that the .env file is loaded before the application starts
    // Otherwise, the application will crash if the .env file is missing or empty
    MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING || '',
  },
  error: async (err, req, res, origNext) => {
    // If the error is caused by a missing or empty .env file, display an error message
    if (err.message.includes('MONGODB_CONNECTION_STRING')) {
      res.status(500).send('Missing or empty .env file');
      return;
    }

    // Otherwise, handle the error as usual
    origNext(err);
  },
};

module.exports = nextConfig;
