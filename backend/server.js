const app = require("./app");

const dotenv = require("dotenv");

//config

dotenv.config({ path: "backend/config/config.env" });

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is up and running on port " + port);
});
