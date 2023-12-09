const mysql = require('mysql2');

// Create a MySQL pool
const pool = mysql.createPool({
  host: 'place_holder',  // MySQL host
  user: 'place_holder',  // MySQL username
  password: 'place_holder',  // MySQL password
  database: 'place_holder',  // MySQL database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Execute a query using the pool
function executeQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = {
  executeQuery
};