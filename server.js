const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/polostore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Kết nối MongoDB thành công'))
.catch(err => console.error('Lỗi kết nối MongoDB:', err));

// Schema và Model
const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    orderDetails: [{
        productName: String,
        quantity: Number,
        price: Number
    }],
    createdAt: { type: Date, default: Date.now }
});
const Customer = mongoose.model('Customer', customerSchema);

// API POST
app.post('/api/orders', async (req, res) => {
    try {
        const customer = new Customer(req.body);
        const savedOrder = await customer.save();
        res.status(201).json({ 
            message: 'Đặt hàng thành công!', 
            orderId: savedOrder._id 
        });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// API GET
app.get('/api/orders/:orderId', async (req, res) => {
    try {
        const order = await Customer.findById(req.params.orderId);
        if (!order) return res.status(404).json({ message: 'Không tìm thấy' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));