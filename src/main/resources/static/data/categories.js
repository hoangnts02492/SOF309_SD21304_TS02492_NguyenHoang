// Danh sách danh mục sản phẩm và các thương hiệu (Định dạng JavaScript)
const categories = [
  {
    id: "mouse",
    name: "Chuột Gaming",
    desc: "Cảm biến quang học cao cấp, trọng lượng siêu nhẹ dưới 60g",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
    brands: ["Logitech", "Razer", "ATK", "Mchose"]
  },
  {
    id: "keyboard",
    name: "Bàn Phím Cơ",
    desc: "Switch từ tính Rapid Trigger & nhôm CNC nguyên khối",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    brands: ["Wooting", "ATK", "Mchose", "Razer"]
  },
  {
    id: "monitor",
    name: "Màn Hình Gaming",
    desc: "Tần số quét 165Hz - 360Hz & tấm nền OLED siêu thực",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
    brands: ["Zowie", "AOC", "Asus", "Samsung"]
  },
  {
    id: "gpu",
    name: "Card Màn Hình (GPU)",
    desc: "Kiến trúc tối tân phục vụ Gaming 4K đỉnh cao & AI Workloads",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80",
    brands: ["Asus", "Colorful", "MSI", "Zotac"]
  },
  {
    id: "audio",
    name: "Tai Nghe Gaming",
    desc: "Âm thanh vòm không gian, định vị tiếng bước chân chuẩn xác",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
    brands: ["HyperX", "SteelSeries", "Logitech", "Razer"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = categories;
}
