const {query} = require('../repositories/main.repository');

class userDao {
  static signUp(user) {
    const insertUserQuery = `INSERT INTO User (email, passwordEncrypted,
        userName, firstName, lastName) 
        values (?, ?, ?, ?, ?)`;

    return query(insertUserQuery, user);
  }

  static exists(value, field) {
    const sql = `SELECT COUNT(*) AS 'exists' FROM User WHERE ${field} = ?`;

    return query(sql, value);
  }

  static get(id) {
    const sql = `SELECT * from User WHERE id = ?`;

    return query(sql, id);
  }

  static getUser(email) {
    const sql = `SELECT * from User WHERE email = '${email}'`;

    return query(sql, email);
  }

  static delete(id) {
    const sql = `DELETE FROM User WHERE id = ?`;

    return query(sql, id);
  }

  static update(id, email, userName, firstName, lastName) {
    let filters = '';
    const queryParams = [];
    let fields = 0;

    if (email) {
      filters += `email = ?`;
      queryParams.push(userName);

      fields++;
    }

    if (userName) {
      if (fields > 0) filters += `,`;

      filters += `userName = ?`;
      queryParams.push(userName);

      fields++;
    }
    if (firstName) {
      if (fields > 0) filters += `,`;

      filters += `firstName = ?`;
      queryParams.push(firstName);

      fields++;
    }

    if (lastName) {
      if (fields > 0) filters += `,`;

      filters += `lastName = ?`;
      queryParams.push(lastName);

      fields++;
    }

    let sql = `UPDATE User SET ${filters} WHERE id = ?`;

    queryParams.push(id);

    return query(sql, queryParams);
  }
}

module.exports = userDao;
