// db_connection.js
import mysql from 'mysql2';
import config from './db_config.js';

const connection = mysql.createConnection(config);

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the database as id', connection.threadId);
  });

export default connection;