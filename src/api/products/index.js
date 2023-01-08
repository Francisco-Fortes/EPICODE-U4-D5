// for product’s image upload (POST /product/:id/upload)
// POST  Review /products/:productId/reviews
import express from "express";
import fs from "fs";

import uniqid from "uniqid";
import { checksProductsSchema, checkValidationResult } from "./validators.js";
import { getProducts } from "../../utils/fs-tools.js";
import { parseFile, uploadFile } from "../../utils/upload/index.js";
const productsRouter = express.Router();

const productsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "products.json"
);
const productsArray = JSON.parse(fs.readFileSync(productsJSONPath));

//-----------------GET ID--------------
productsRouter.get("/:productId", (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = productsArray.find((product) => {
      product.id === productId;
    });
    res.send(product);
  } catch (error) {
    next(error);
  }
}); //single product

//--------------PUT----------------
productsRouter.put("/:productId", (req, res, next) => {
  try {
    const index = productsArray.findIndex(
      (product) => product.id === req.params.productId
    );
    const oldProduct = productsArray[index];
    const updatedProduct = {
      ...oldProduct,
      ...req.body,
      updatedAt: new Date(),
    };
    productsArray[index] = updatedProduct;
    fs.writeFileSync(productsJSONPath, JSON.stringify(productsArray));
    res.send(updatedProduct);
  } catch (error) {
    next(error);
  }
}); //single product
//-------------PUT IMAGE----------------
productsRouter.put(
  "/:productId/productImage",
  parseFile.single("productImage"),
  uploadFile,
  async (req, res, next) => {
    try {
      const index = productsArray.findIndex(
        (product) => product.id === req.params.productId
      );
      const oldProduct = productsArray[index];
      const updatedProduct = {
        ...oldProduct,
        ...req.body,
        updatedAt: new Date(),
      };
      productsArray[index] = updatedProduct;
      fs.writeFileSync(productsJSONPath, JSON.stringify(productsArray));
      res.send(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
); //single product

//------------DELETE---------------
productsRouter.delete("/:productId", (req, res, next) => {
  try {
    const remainingProducts = productsArray.filter(
      (product) => product.id !== req.params.productId
    );
    fs.writeFileSync(usersJSONPath, JSON.stringify(remainingUsers));
    res.send("Deleted successfully");
  } catch (error) {
    next(error);
  }
}); //single product

//---------------POST--------------
productsRouter.post(
  "/",
  checksProductsSchema,
  checkValidationResult,
  (req, res, next) => {
    try {
      //Server generated info
      console.log(req.body);
      const newProduct = {
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: uniqid(),
      };
      console.log(newProduct);
      productsArray.push(newProduct);
      fs.writeFileSync(productsJSONPath, JSON.stringify(productsArray));
      res.status(201).send({ id: newProduct.id });
    } catch (error) {
      next(error);
    }
  }
); //products

//--------------GET ALL---------------
productsRouter.get("/", (req, res, next) => {
  try {
    // console.log(req.query);
    const fileContentAsABuffer = fs.readFileSync(productsJSONPath);
    const productsArray = JSON.parse(fileContentAsABuffer);
    //If there is a query that contains category then execute the if statement
    if (req.query && req.query.category) {
      const filteredProducts = productsArray.filter(
        (product) => product.category === req.query.category
      );
      res.send(filteredProducts);
    } else {
      res.send(productsArray);
    }
  } catch (error) {
    next(error);
  }
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
