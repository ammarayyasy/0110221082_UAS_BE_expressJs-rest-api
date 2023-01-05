// import database
const db = require("../config/database");

// membuat class Patient
class Patient {
  // model all()
  static all() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM patients";

      db.query(query, (err, results) => {
        resolve(results);
      });
    });
  }

  // model create()
  static async create(data) {
    const id = await new Promise((resolve, reject) => {
      const sql = "INSERT INTO patients SET ?";
      db.query(sql, data, (err, results) => {
        resolve(results.insertId);
      });
    });

    // mencari data yang baru ditambahkan
    const patient = await this.find(id);
    return patient;
  }

  // model find()
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE id = ?";
      db.query(sql, id, (err, results) => {
        const [patient] = results;
        resolve(patient);
      });
    });
  }

  // model update
  static async update(id, data) {
    await new Promise((resolve, reject) => {
      const sql = "UPDATE patients SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) => {
        resolve(results);
      });
    });

    // mencari data yang baru diupdate
    const patient = await this.find(id);
    return patient;
  }

  // model delete
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM patients WHERE id = ?";

      db.query(sql, id, (err, results) => {
        resolve(results);
      });
    });
  }

  // model search
  static search(name) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE name = ?";
      db.query(sql, name, (err, results) => {
        const [patient] = results;
        resolve(patient);
      });
    });
  }

  // model findByStatus
  static findByStatus(status) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM patients WHERE status = ?";

      db.query(query, status, (err, results) => {
        resolve(results);
      });
    });
  }
}

// export class Patient
module.exports = Patient;
