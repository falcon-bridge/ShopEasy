const app = require("./app");

const dotenv = require("dotenv");

const connectDatabase = require("./config/database");

//config

dotenv.config({ path: "backend/config/config.env" });

//connecting to database

connectDatabase();

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is up and running on port " + port);
});
