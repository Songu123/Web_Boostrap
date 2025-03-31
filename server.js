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
    city: { type: String, required: true },
    district: { type: String, required: true },
    ward: { type: String, required: true },
    address: { type: String, required: true },
    notes: { type: String },
    createAccount: { type: Boolean, default: false },
    orderDetails: [{
        productId: { type: String, required: true },
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    createdAt: { type: Date, default: Date.now }
});

const Customer = mongoose.model('Customer', customerSchema);

// API POST
app.get('/api/orders', async (req, res) => {
    try {
        // Lấy danh sách đơn hàng
        const orders = await Customer.find().sort({ createdAt: -1 });

        // Đếm tổng số đơn hàng
        const totalOrders = await Customer.countDocuments();

        // Tính tổng doanh thu
        const totalRevenue = orders.reduce((sum, order) => {
            const orderTotal = order.orderDetails.reduce((orderSum, item) => orderSum + item.price * item.quantity, 0);
            return sum + orderTotal;
        }, 0);

        // Trả về dữ liệu JSON
        res.status(200).json({
            totalOrders: totalOrders,
            totalRevenue: totalRevenue,
            orders: orders
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách đơn hàng:', error.message);

        // Trả về lỗi chi tiết hơn
        res.status(500).json({ 
            message: 'Lỗi server khi lấy danh sách đơn hàng', 
            error: error.message 
        });
    }
});

// API GET all orders

app.get('/api/orders', async (req, res) => {
    try {
        // Lấy danh sách đơn hàng
        const orders = await Customer.find().sort({ createdAt: -1 });

        // Đếm tổng số đơn hàng
        const totalOrders = await Customer.countDocuments();

        // Log để kiểm tra giá trị
        console.log('Tổng số đơn hàng:', totalOrders);

        // Trả về dữ liệu JSON
        res.status(200).json({
            totalOrders: totalOrders,
            orders: orders
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách đơn hàng:', error.message);

        // Trả về lỗi chi tiết hơn
        res.status(500).json({ 
            message: 'Lỗi server khi lấy danh sách đơn hàng', 
            error: error.message 
        });
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



const PORT = 3000;
app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));