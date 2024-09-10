require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found");
const route = require("./routes/product");
const errorHandler = require("./middleware/error-handler");
const app = express();

app.get("/", (req, res) => {
  res.send("hello hehe");
});

app.use("/api/v1/products", route);

app.use(notFoundMiddleware);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => console.log(`Listening on ${port}`));
};
start();
