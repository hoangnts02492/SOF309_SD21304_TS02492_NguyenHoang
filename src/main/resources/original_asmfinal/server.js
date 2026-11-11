const express = require('express');
const path = require('path');

// Nhập trực tiếp dữ liệu từ file JavaScript (.js) thay vì file JSON
const products = require('./data/products');
const categories = require('./data/categories');
const ordersDB = require('./data/orders');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// --- REST API ENDPOINTS (HOÀN TOÀN BẰNG JAVASCRIPT) ---

// 1. Lấy danh sách sản phẩm (có hỗ trợ lọc, tìm kiếm, sắp xếp)
app.get('/api/products', (req, res) => {
  let result = [...products];
  const { category, brand, search, sort, minPrice, maxPrice } = req.query;

  // Lọc theo danh mục
  if (category && category !== 'all') {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // Lọc theo thương hiệu
  if (brand) {
    result = result.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
  }

  // Tìm kiếm theo từ khóa
  if (search) {
    const q = search.toLowerCase().trim();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  }

  // Lọc theo khoảng giá
  if (minPrice) {
    result = result.filter(p => p.price >= Number(minPrice));
  }
  if (maxPrice) {
    result = result.filter(p => p.price <= Number(maxPrice));
  }

  // Sắp xếp
  if (sort === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'reviews') {
    result.sort((a, b) => b.reviewsCount - a.reviewsCount);
  }

  res.json({
    total: result.length,
    data: result
  });
});

// 2. Lấy chi tiết 1 sản phẩm theo ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
  }
  res.json(product);
});

// 3. Lấy danh mục sản phẩm
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

// 4. Kiểm tra mã giảm giá (Vouchers JS Object)
app.post('/api/voucher/verify', (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ valid: false, message: 'Vui lòng nhập mã giảm giá' });
  }

  const cleanCode = code.toUpperCase().trim();
  const vouchers = {
    'GEARVIP10': { discountPercent: 10, description: 'Giảm 10% tổng đơn hàng' },
    'FREESHIP': { freeShipping: true, description: 'Miễn phí vận chuyển toàn quốc' },
    'CHAOBAN': { discountAmount: 100000, description: 'Giảm ngay 100.000₫ cho khách hàng mới' },
    'CONBOVUIVE': { discountPercent: 15, description: 'Đặc quyền thành viên Conbovuive - Giảm 15%' }
  };

  if (vouchers[cleanCode]) {
    res.json({
      valid: true,
      code: cleanCode,
      ...vouchers[cleanCode]
    });
  } else {
    res.status(404).json({ valid: false, message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn!' });
  }
});

// 5. Tạo đơn hàng mới qua module orders.js
app.post('/api/orders', (req, res) => {
  const { customer, items, total, discount = 0, voucherCode = '', shippingFee = 0, note = '' } = req.body;

  if (!customer || !customer.name || !customer.phone || !customer.address || !items || items.length === 0) {
    return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin giao hàng và giỏ hàng' });
  }

  const newOrder = ordersDB.addOrder({
    customer,
    items,
    voucherCode,
    discount,
    shippingFee,
    total,
    note
  });

  res.status(201).json({
    success: true,
    message: 'Đặt hàng thành công!',
    order: newOrder
  });
});

// 6. Lấy danh sách các đơn hàng
app.get('/api/orders', (req, res) => {
  res.json(ordersDB.getAllOrders());
});

// 7. Thống kê cửa hàng
app.get('/api/stats', (req, res) => {
  const allOrders = ordersDB.getAllOrders();
  res.json({
    totalProducts: products.length,
    totalCategories: categories.length,
    totalOrders: allOrders.length,
    hotCount: products.filter(p => p.badge && p.badge.includes('HOT')).length
  });
});

// Phục vụ fallback giao diện
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Khởi động Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  CONBOVUIVE GEAR - NODE.JS JAVASCRIPT DATA SERVER  `);
  console.log(`====================================================`);
  console.log(`  🌐 Website: http://localhost:${PORT}`);
  console.log(`  📁 Mode:    Toàn bộ cấu trúc thuần JavaScript`);
  console.log(`  ⚡ API:     http://localhost:${PORT}/api/products`);
  console.log(`====================================================`);
});
