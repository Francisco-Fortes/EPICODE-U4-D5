import express from "express";
import productsRouter from "./api/products/index.js";
import listEndpoints from "express-list-endpoints";
const server = express();
const port = 3001;
server.use(express.json());
//ENDPOINTS
server.use("/products", productsRouter);
server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log("server is running on port:", port);
});
