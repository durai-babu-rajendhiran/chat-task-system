import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Replace with your MySQL password
  database: 'chat_system',
});
