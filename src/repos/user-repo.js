const pool = require("../pool");
const toCamelCase = require("./utils/to-camel-case");
class UserRepo {
  static async find() {
    const { rows } = await pool.query("SELECT * FROM users;");
    return toCamelCase(rows);
  }

  static async findById(id) {
    try {
      const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1;`, [
        id,
      ]);
      return toCamelCase(rows)[0];
    } catch (err) {
      console.error(err);
    }
  }

  static async insert(username, bio) {
    try {
      const { rows } = await pool.query(
        `INSERT INTO users (username, bio) VALUES($1, $2) RETURNING *;`,
        [username, bio]
      );
      return toCamelCase(rows)[0];
    } catch (err) {
      console.error(err);
    }
  }

  static async update(id, username, bio) {
    try {
      const { rows } = await pool.query(
        `UPDATE users SET username = $1, bio = $2 WHERE id = $3 RETURNING *;`,
        [username, bio, id]
      );
      return toCamelCase(rows)[0];
    } catch (err) {
      console.error(err);
    }
  }

  static async delete(id) {
    try {
      const { rows } = await pool.query(
        `DELETE from users WHERE id = $1 RETURNING *;`,
        [id]
      );
      return toCamelCase(rows)[0];
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = UserRepo;
