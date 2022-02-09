/* eslint-disable no-console */
const pool = require('../utils/pool');


module.exports = class Secret {
  id;
  userId;
  title;
  description;
  createdAt;

  constructor (row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.title = row.title;
    this.description = row.description;
    this.createdAt = row.created_at;
  }
  static async createSecret(userId, title, description) {
    console.log(userId, title, description);
    const { rows } = await pool.query('INSERT INTO secrets (user_id, title, description) VALUES ($1, $2, $3) RETURNING *', [userId, title, description]);
    console.log(rows[0]);

    return new Secret(rows[0]);
  }
  static async getAllSecrets() {
    const { rows } = await pool.query('SELECT * FROM secrets');
    return rows.map((row) => new Secret(row));
  }



};
