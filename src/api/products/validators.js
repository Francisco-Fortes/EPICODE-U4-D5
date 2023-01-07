import { checkSchema } from "express-validator";
import createHttpError from "http-errors";
const { BadRequest } = createHttpError;
const productSchema = {
  name: {
    in: ["body"],
    isString: {
      errorMessage: "Name is a mandatory field, it has to be a string",
    },
  },

  description: {
    in: ["body"],
    isString: {
      errorMessage: "Description is a mandatory field, it has to be a string",
    },
  },
  brand: {
    in: ["body"],
    isString: {
      errorMessage: "Brand is a mandatory field, it has to be a string",
    },
  },
  price: {
    in: ["body"],
    isNumeric: {
      errorMessage: "Price is a mandatory field, it has to be a number",
    },
  },
  category: {
    in: ["body"],
    isString: {
      errorMessage: "Category is a mandatory field, it has to be a string",
    },
  },
};

export const checksProductsSchema = checkSchema(productSchema);

export const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.array());
  //If the error list is not empty...
  if (!errors.isEmpty()) {
    //Another way to do it
    // next(
    //     createHttpError(400, "Errors during product validation", {
    //       errorList: errors.array(),
    //     })
    //   );
    next(
      BadRequest("Errors during product validation", {
        errorList: errors.array(),
      })
    );
  } else {
    next();
  }
};
