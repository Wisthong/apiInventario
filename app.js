require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectionDB } = require("./db/mongo");

const app = express();
app.use(cors({ origin: whileList }));
app.use(express.json());

const port = process.env.PORT;
connectionDB();

app.listen(port, () => {
  console.log(`http://localhost:${port}/api/`);
});

app.use("/api", require("./routes"));
