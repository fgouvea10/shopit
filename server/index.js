const app = require("./app");
const connectDatabase = require("./config/database");

const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on localhost:${process.env.PORT} at ${process.env.NODE_ENV} mode`
  );
});
