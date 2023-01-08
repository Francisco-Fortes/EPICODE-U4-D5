import express from "express";
import productsRouter from "./api/products/index.js";
import listEndpoints from "express-list-endpoints";
import {
  badRequestHandler,
  genericErrorHandler,
  notFoundHandler,
  unauthorizedHandler,
} from "./api/products/errorHandlers.js";
const server = express();
const port = 3001;

server.use(express.json());

// server.use(express.static(publicDirectory));

//ENDPOINTS
server.use("/products", productsRouter);

//ERROR HANDLERS
server.use(genericErrorHandler);
server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(notFoundHandler);

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log("server is running on port:", port);
});
