const controller = require("../controllers/product.controller.js");

module.exports = function(app) {

  app.get("/getAllProduct", controller.getProducts);
  app.get("/getProduct/:id", controller.getProductById)
  app.get("/getProductsByCategory/:id", controller.getProductsByCategoryId)
  app.get("/search", controller.searchElastic)
  app.post("/createProduct", controller.createProduct)
  app.delete("/:id", controller.deleteProduct);
};