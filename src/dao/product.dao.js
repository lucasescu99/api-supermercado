const { query } = require("../repositories/main.repository");

class productDao {
  static add(product) {
    const insertProductQuery = `INSERT INTO Product (category, name,
        stock, description
        values (?, ?, ?, ?)`;
    return query(insertProductQuery, product);
  }

  static exists(value, field) {
    const sql = `SELECT COUNT(*) AS 'exists' FROM Product WHERE ${field} = ?`;
    return query(sql, value);
  }

  static get(id) {
    const sql = `SELECT * from Product WHERE id = ?`;
    return query(sql, id);
  }

  static getAll() {
    const sql = `SELECT * from Product`;
    return query(sql);
  }

  static delete(id) {
    const sql = `DELETE FROM Product WHERE id = ?`;

    return query(sql, id);
  }

  static update(id, category, name, stock, description) {
    let filters = "";
    const queryParams = [];
    let fields = 0;

    if (category) {
      filters += `category = ?`;
      queryParams.push(category);
      fields++;
    }

    if (name) {
      if (fields > 0) filters += `,`;
      filters += `name = ?`;
      queryParams.push(name);
      fields++;
    }
    if (stock) {
      if (fields > 0) filters += `,`;

      filters += `stock = ?`;
      queryParams.push(stock);

      fields++;
    }

    if (description) {
      if (fields > 0) filters += `,`;
      filters += `description = ?`;
      queryParams.push(description);
      fields++;
    }

    let sql = `UPDATE Product SET ${filters} WHERE id = ?`;
    queryParams.push(id);
    return query(sql, queryParams);
  }
}

module.exports = productDao;
