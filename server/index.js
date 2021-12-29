const app = require("./app");
const connectDatabase = require("./config/database");

const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on ${process.env.HOST}:${process.env.PORT} at ${process.env.NODE_ENV} mode`
  );
});

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
