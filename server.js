const express = require('express');
const cors = require('cors');
const db = require('./database');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API lấy danh sách sản phẩm hoặc tài khoản
app.get('/data/:type', (req, res) => {
    const { type } = req.params;
    const isAccount = type === 'account';
    const table = isAccount ? 'users' : 'products';
    
    db.query(`SELECT * FROM ${table}`, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// API thêm sản phẩm hoặc tài khoản
app.post('/data/:type', (req, res) => {
    const { type } = req.params;
    const isAccount = type === 'account';
    const table = isAccount ? 'users' : 'products';
    const data = req.body;

    const sql = isAccount
        ? 'INSERT INTO users (username, name, email, password, role) VALUES (?, ?, ?, ?, ?)'
        : 'INSERT INTO products (name, description, price, image1, image2) VALUES (?, ?, ?, ?, ?)';
    
    const values = isAccount
        ? [data.username, data.name, data.email, data.password, data.role]
        : [data.name, data.describe, data.price, data.img1, data.img2];

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId });
    });
});

// API cập nhật sản phẩm hoặc tài khoản
app.put('/data/:type/:id', (req, res) => {
    const { type, id } = req.params;
    const isAccount = type === 'account';
    const table = isAccount ? 'users' : 'products';
    const data = req.body;

    const sql = isAccount
        ? 'UPDATE users SET username=?, name=?, email=?, password=?, role=? WHERE id=?'
        : 'UPDATE products SET name=?, description=?, price=?, image1=?, image2=? WHERE id=?';
    
    const values = isAccount
        ? [data.username, data.name, data.email, data.password, data.role, id]
        : [data.name, data.describe, data.price, data.img1, data.img2, id];

    db.query(sql, values, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// API xóa sản phẩm hoặc tài khoản
app.delete('/data/:type/:id', (req, res) => {
    const { type, id } = req.params;
    const isAccount = type === 'account';
    const table = isAccount ? 'users' : 'products';

    db.query(`DELETE FROM ${table} WHERE id=?`, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));