const express = require("express");
const cors = require("cors");
require("./db/mongoose");

const connectRouter = require("./routers/connect");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/connect", connectRouter);

app.listen(port, () => {
  console.log("Server up on port " + port);
});
