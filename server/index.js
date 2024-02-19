const express = require("express");
const app = express();
const petsRoutes = require("./routes/petRoutes.js");
const cors = require("cors");
const path = require("path");

// app.use(express.static(path.join(__dirname, "public")));

const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use("/", petsRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
