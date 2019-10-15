const Validator = require("validator");
const checkEmpty = require("./checkEmpty");

module.exports = function validateRegisterInput(data) {
  // initial empty errors object
  let errors = {};

  data.prod_name = !checkEmpty(data.prod_name) ? data.prod_name : "";
  data.description = !checkEmpty(data.description) ? data.description : "";
  data.category = !checkEmpty(data.category) ? data.category : "";
  data.price = !checkEmpty(data.price) ? data.price : "";
  data.size = !checkEmpty(data.price) ? data.size : "";

  if (!Validator.isLength(data.prod_name, { min: 4, max: 20 })) {
    errors.prod_name = "Product Name must be between 4 and 20 characters";
  }

  if (Validator.isEmpty(data.prod_name)) {
    errors.prod_name = "Name field is required. ";
  }

  if (!Validator.isLength(data.description, { min: 200, max: 1000 })) {
    errors.description = "Product Description must be between 200 and 1000 characters";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Product description field is required. ";
  }


  // Please check how to check for dropdown values

  // if (Validator.isEmpty(data.category)) {
  //   errors.category = "Category field is required";
  // }

  // if (!Validator.isLength(data.category, { min: 6, max: 30 })) {
  //   errors.category = "Please select category";
  }

  if (Validator.isInt(data.price)) {
    errors.price = "Please enter price";

  }

  return {
    errors,
    isValid: checkEmpty(errors)
  };
};
