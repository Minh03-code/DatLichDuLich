import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'datlichdulich',
});

connection.connect((err) => {
  if (err) {
    console.error('Kết nối database thất bại: ', err.message);
  } else {
    console.log('Kết nối database thành công');
  }
});

export default connection;