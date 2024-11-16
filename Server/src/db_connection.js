// db_connection.js
import mysql from 'mysql2';
import db_config from './db_config.js';

const db = mysql.createPool(db_config);

db.getConnection((err, conn) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Database connected successfully!');
    conn.release();
  }
});

export default db;