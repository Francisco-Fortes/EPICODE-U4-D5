import express from "express";
import productsRouter from "./api/products/index.js";
const server = express();
const port = 3001;
//ENDPOINTS
server.use("/products", productsRouter);
server.listen(port, () => {
  console.log("server is running on port:", port);
});
