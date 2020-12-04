const userDao = require("../dao/user.dao");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_TOKEN = require("../../config/settings").apiSecret;
const SALT = require("../../config/settings").saltRounds;

class userService {
  static async signUp(email, password, userName, firstName, lastName) {
    const result = await userDao.exists(email, "email");
    const exists = result[0].exists;

    if (exists > 0) throw { error: "email_in_use", msg: "Email en uso" };

    bcrypt.genSalt(SALT, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        // Store hash in your password DB.
        const user = [email, hash, userName, firstName, lastName];
        return userDao.signUp(user);
      });
    });
  }

  static async update(id, email, userName, firstName, lastName,role) {
    const exists = await userDao.exists(id, "id");
    if (exists[0].exists === 0)
      throw {
        error: "user_not_found",
        msg: "Usuario no encontrado"
      };

    return userDao.update(id,email, userName, firstName, lastName,role);
  }

  static async delete(id) {
    const exists = await userDao.exists(id, "id");
    if (exists[0].exists === 0)
      throw {
        error: "user_not_found",
        msg: "Usuario no encontrado"
      };

    return userDao.delete(id);
  }

  static async get(id) {
    const exists = await userDao.exists(id, "id");
    if (exists[0].exists === 0)
      throw {
        error: "user_not_found",
        msg: "Usuario no encontrado"
      };

    return userDao.get(id);
  }

  static async login(email, password) {
    const result = await userDao.exists(email, "email");
    const exists = result[0].exists;
    if (exists < 1)
      throw {
        error: "user_not_found",
        msg: "User is incorrect"
      };

    const [user] = await userDao.getUser(email);
    try {
      let valid = bcrypt.compare(password, user.passwordEncrypted);
      console.log("User %j",user)
      const token = jwt.sign(
        {
          role: user.role,
          data: user.id
        },
        SECRET_TOKEN,
        {
          expiresIn: Math.floor(Date.now() / 1000) + 60 * 60
        }
      );
      if (valid) return token;
    } catch (err) {
      return err;
    }
  }
}

module.exports = userService;
