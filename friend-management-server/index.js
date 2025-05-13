const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());

//endpoints
app.get("/", (req, res) => {
  res.send("Friend management server is running");
});
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
