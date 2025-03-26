const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',        // Thay bằng user MySQL của bạn
    password: '',        // Thay bằng mật khẩu MySQL của bạn
    database: 'shop_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

module.exports = connection;