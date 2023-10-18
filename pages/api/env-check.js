import fs from "fs";
import path from "path";

export default (req, res) => {
  const envFilePath = path.resolve(".env");
  const envFileExists = fs.existsSync(envFilePath);
  const hasConnectionString = !!process.env.MONGODB_CONNECTION_STRING;

  res.status(200).json({ envFileExists, hasConnectionString });
};
