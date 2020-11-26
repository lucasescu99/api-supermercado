const productDao = require("../dao/product.dao");

class productService {
  static async add(category, name, stock, description) {
    const result = await productDao.exists(name, "name");
    const exists = result[0].exists;
    if (exists > 0)
      throw { error: "product_already_exists", msg: "El producto ya existe." };
    const product = [category, name, stock, description];
    return productDao.add(product);
  }

  static async update(id, category, name, stock, description) {
    const exists = await productDao.exists(id, "id");
    if (exists[0].exists === 0)
      throw {
        error: "product_not_found",
        msg: "Producto no encontrado"
      };
    return productDao.update(category, name, stock, description);
  }

  static async delete(id) {
    const exists = await productDao.exists(id, "id");
    if (exists[0].exists === 0)
      throw {
        error: "product_not_found",
        msg: "Usuario no encontrado"
      };

    return productDao.delete(id);
  }

  static async get(id) {
    const exists = await productDao.exists(id, "id");
    if (exists[0].exists === 0)
      throw {
        error: "product_not_found",
        msg: "Producto no encontrado"
      };

    return productDao.get(id);
  }

  static async getAll() {
    return productDao.getAll();
  }
}

module.exports = productService;
