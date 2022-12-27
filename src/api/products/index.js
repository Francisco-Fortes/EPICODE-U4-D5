//User ENDPOINTS

// USER CRUD ENDPOINTS
// ENDPOINTS
// CRUD for Products ( /products GET, POST, DELETE, PUT)
// for product’s image upload (POST /product/:id/upload)
// POST  Review /products/:productId/reviews
import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
const productsRouter = express.Router();

const productsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "products.json"
);
//-----------------GET ID--------------
productsRouter.get("/:productId", (req, res) => {
  const productId = req.params.productId;
  const productsArray = JSON.parse(fs.readFileSync(productsJSONPath));
  const product = productsArray.find((product) => {
    product.id === productId;
  });
  res.send(product);
}); //single product
//--------------PUT----------------
productsRouter.put("/:productId", (req, res) => {
  const productsArray = JSON.parse(fs.readFileSync(productsJSONPath));
  const index = productsArray.findIndex(
    (product) => product.id === req.params.productId
  );
  const oldProduct = productsArray[index];
  const updatedProduct = { ...oldProduct, ...req.body, updatedAt: new Date() };
  productsArray[index] = updatedProduct;
  fs.writeFileSync(productsJSONPath, JSON.stringify(productsArray));
  res.send(updatedProduct);
}); //single product
//------------DELETE---------------
productsRouter.delete("/:productId", (req, res) => {
  const productsArray = JSON.parse(fs.readFileSync(productsJSONPath));
  const remainingProducts = productsArray.filter(
    (product) => product.id !== req.params.productId
  );
  fs.writeFileSync(usersJSONPath, JSON.stringify(remainingUsers));
  res.send("Deleted successfully");
}); //single product
//---------------POST--------------
productsRouter.post("/", (req, res) => {
  //Server generated info
  const newProduct = {
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: uniqid(),
  };
  console.log(newProduct);
  const productsArray = JSON.parse(fs.readFileSync(productsJSONPath));
  productsArray.push(newProduct);
  fs.writeFileSync(productsJSONPath, JSON.stringify(productsArray));
  res.status(201).send({ id: newProduct.id });
}); //products
//--------------GET ALL---------------
productsRouter.get("/", (req, res) => {
  const fileContentAsABuffer = fs.readFileSync(productsJSONPath);
  const productsArray = JSON.parse(fileContentAsABuffer);
  res.send(productsArray);
}); //products

export default productsRouter;
// Challenge: Marketplace / Amazon Like

// You are in charge of building the Backend using NodeJS + Express. The backend should handle products and reviews:

// Every product in your marketplace is shaped in this way:

//     {
//         "_id": "5d318e1a8541744830bef139", //SERVER GENERATED
//         "name": "3310",  //REQUIRED
//         "description": "somthing longer", //REQUIRED
//         "brand": "nokia", //REQUIRED
//         "imageUrl":"https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80",
//         "price": 100, //REQUIRED
//         "category": "smartphones" //REQUIRED
//         "createdAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
//         "updatedAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
//     }

// And the reviews look like this:

//      {
//         "_id": "123455", //SERVER GENERATED
//         "comment": "A good book but definitely I don't like many parts of the plot", //REQUIRED
//         "rate": 3, //REQUIRED, max 5
//         "productId": "5d318e1a8541744830bef139", //REQUIRED
//         "createdAt": "2019-08-01T12:46:45.895Z" // SERVER GENERATED
//     }

// For both Products and Reviews, the field createdAt should be set when adding the current product/review to the list. (server side)
// The updatedAt should be equal to createdAt on creation and then change for each and every PUT on that very item.  (server side)
// Remember to validate everything that comes from the FE
// Test all the endpoints, also edge cases, and handle errors properly

// Extras
// GET list of  Reviews /products/:productId/reviews/
// GET single Review /products/:productId/reviews/:reviewId
// PUT  update Review /products/:productId/reviews/:reviewId
// DELETE  Review /products/:productId/reviews/:reviewId
// Filter by a category, GET /products?category=horror => should return only products belonging to the specified category
