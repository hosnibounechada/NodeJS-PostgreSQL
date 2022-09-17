const app = require("./src/app");
const pool = require("./src/pool");

pool
  .connect({
    host: "localhost",
    port: 5432,
    database: "socialnetwork",
    user: "postgres",
    password: "password",
  })
  .then(() => {
    app().listen(3000, () => console.log("Listening on PORT 3000!"));
  })
  .catch((err) => console.error(err));
