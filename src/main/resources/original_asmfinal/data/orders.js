// Quản lý đơn hàng (Định dạng JavaScript)
const orders = [];

function getAllOrders() {
  return orders;
}

function getOrderById(id) {
  return orders.find(o => o.id === id);
}

function addOrder(orderData) {
  const newOrder = {
    id: 'CBV-' + Math.floor(100000 + Math.random() * 900000),
    createdAt: new Date().toISOString(),
    customer: orderData.customer,
    items: orderData.items,
    voucherCode: orderData.voucherCode || '',
    discount: orderData.discount || 0,
    shippingFee: orderData.shippingFee || 0,
    total: orderData.total,
    note: orderData.note || '',
    status: 'Chờ xác nhận'
  };

  orders.unshift(newOrder);
  return newOrder;
}

module.exports = {
  orders,
  getAllOrders,
  getOrderById,
  addOrder
};
