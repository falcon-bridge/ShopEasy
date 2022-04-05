const app = require("./app");

const dotenv = require("dotenv");

const connectDatabase = require("./config/database");

//config

dotenv.config({ path: "backend/config/config.env" });

//connecting to database

connectDatabase();

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log("Server is up and running on port " + port);
});

//unhandled promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
