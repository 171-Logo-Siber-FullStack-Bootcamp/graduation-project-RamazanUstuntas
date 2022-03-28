export default class Product {
  constructor(name, description, price, category_id, warranty, img_url) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.category_id = category_id;
    this.warranty = warranty;
    this.img_url = img_url;
  }
}