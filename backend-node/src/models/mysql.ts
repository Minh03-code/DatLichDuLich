import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST || 'localhost',
  user: process.env.USERNAME || 'root',
  password: process.env.PASSWORD || '',
  database: process.env.DATABASE || 'datlichdulich',
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err.message);
  } else {
    console.log('Connected to database');
  }
});

export default connection;