// db_connection.js
import mysql from 'mysql2';
import config from './db_config.js';

const db = mysql.createConnection(config);

db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the database as id', db.threadId);
  });

export default db;