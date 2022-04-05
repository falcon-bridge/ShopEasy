const app = require("./app");

const dotenv = require("dotenv");

const connectDatabase = require("./config/database");

//handling uncaught exception

process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to Uncaught Exception");

  process.exit(1);
});

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
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
