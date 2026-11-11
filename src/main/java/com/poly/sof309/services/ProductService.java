package com.poly.sof309.services;

import com.poly.sof309.models.Product;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private final List<Product> products = Collections.synchronizedList(new ArrayList<>());

    public ProductService() {
        initProducts();
    }

    private void initProducts() {
        // cbv-01
        Map<String, String> s1 = new LinkedHashMap<>();
        s1.put("Cảm biến", "HERO 2 32.000 DPI");
        s1.put("Polling Rate", "4000Hz (0.25ms)");
        s1.put("Trọng lượng", "60 gram");
        s1.put("Pin", "95 giờ liên tục");
        products.add(new Product("cbv-01", "Logitech G Pro X Superlight 2", "mouse", "Chuột Gaming", "Logitech",
                3490000, 3890000, "-10%", "HOT SELLER",
                "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
                Collections.singletonList("https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80"),
                "Siêu phẩm chuột gaming thế hệ mới với cảm biến HERO 2 độ phân giải 32.000 DPI.",
                s1, true, 18, 4.9, 142));

        // cbv-02
        Map<String, String> s2 = new LinkedHashMap<>();
        s2.put("Cảm biến", "Focus Pro 35K Gen 2");
        s2.put("Polling Rate", "8000Hz Không dây");
        products.add(new Product("cbv-02", "Razer Viper V3 Pro Wireless", "mouse", "Chuột Gaming", "Razer",
                3990000, 4390000, "-9%", "ESPORTS CHOICE",
                "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?auto=format&fit=crop&w=800&q=80",
                Collections.singletonList("https://images.unsplash.com/photo-1629429408209-1f912961dbd8?auto=format&fit=crop&w=800&q=80"),
                "Chuột chơi game không dây đối xứng thế hệ mới, hỗ trợ Polling Rate HyperPolling Wireless 8000Hz.",
                s2, true, 25, 4.8, 98));

        // cbv-03
        products.add(new Product("cbv-03", "ATK Blazing Sky F1 Ultimate", "mouse", "Chuột Gaming", "ATK",
                1890000, 2190000, "-14%", "BEST VALUE",
                "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
                Collections.singletonList("https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80"),
                "Vỏ carbon composite siêu bền bỉ chỉ 38g, cảm biến PAW3950 Ultra hàng đầu phân khúc.",
                new HashMap<>(), true, 30, 4.7, 64));

        // cbv-04
        products.add(new Product("cbv-04", "Mchose A5 Pro Max Wireless", "mouse", "Chuột Gaming", "Mchose",
                1090000, 1290000, "-15%", "BUDGET KING",
                "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
                Collections.singletonList("https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80"),
                "Chuột gaming quốc dân cấu hình khủng với PAW3395, kết nối 3 chế độ mượt mà.",
                new HashMap<>(), true, 42, 4.6, 120));

        // cbv-05
        products.add(new Product("cbv-05", "Wooting 60HE+ Rapid Trigger", "keyboard", "Bàn Phím Cơ", "Wooting",
                4890000, 5290000, "-8%", "TOP 1 VALORANT",
                "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
                Collections.singletonList("https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"),
                "Bàn phím cơ số 1 cho game FPS với công nghệ Rapid Trigger và switch từ tính Lekker.",
                new HashMap<>(), true, 12, 5.0, 210));

        // cbv-06
        products.add(new Product("cbv-06", "ATK RS7 Pro Hall Effect CNC", "keyboard", "Bàn Phím Cơ", "ATK",
                2490000, 2790000, "-11%", "HOT PRODUCT",
                "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
                Collections.singletonList("https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80"),
                "Bàn phím vỏ nhôm CNC nguyên khối kết hợp switch từ tính Hall Effect 8000Hz.",
                new HashMap<>(), true, 15, 4.8, 85));

        // cbv-07
        products.add(new Product("cbv-07", "Mchose GX87 Nhôm CNC 3 Modes", "keyboard", "Bàn Phím Cơ", "Mchose",
                1690000, 1990000, "-15%", "BEST SELLER",
                "https://images.unsplash.com/photo-1541140532154-b024d705b909?auto=format&fit=crop&w=800&q=80",
                Collections.singletonList("https://images.unsplash.com/photo-1541140532154-b024d705b909?auto=format&fit=crop&w=800&q=80"),
                "Phím cơ custom nhôm Anode cực đầm tay, mạch xuôi hotswap 5-pin và pin 8000mAh.",
                new HashMap<>(), true, 20, 4.7, 92));

        // cbv-08
        products.add(new Product("cbv-08", "Razer Huntsman V3 Pro TKL", "keyboard", "Bàn Phím Cơ", "Razer",
                5490000, 5990000, "-8%", "FLAGSHIP",
                "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
                Collections.singletonList("https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"),
                "Bàn phím cơ đỉnh cao với switch quang học Gen-2 tùy chỉnh điểm nhận lực 0.1-4.0mm.",
                new HashMap<>(), true, 10, 4.9, 115));

        // cbv-09
        products.add(new Product("cbv-09", "BenQ Zowie XL2566K 360Hz DyAc+", "monitor", "Màn Hình Gaming", "Zowie",
                16990000, 17990000, "-6%", "PRO ESPORTS",
                "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
                Collections.singletonList("https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80"),
                "Màn hình thi đấu chuẩn quốc tế cho CS2 và Valorant với tần số quét 360Hz mượt mà tuyệt đối.",
                new HashMap<>(), true, 8, 4.9, 78));

        // cbv-10
        products.add(new Product("cbv-10", "AOC 24G2SP 165Hz IPS 1ms", "monitor", "Màn Hình Gaming", "AOC",
                3290000, 3690000, "-11%", "BEST SELLER",
                "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
                Collections.singletonList("https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"),
                "Màn hình quốc dân phân khúc 3 triệu với tấm nền IPS 165Hz sắc nét, chuẩn màu 125% sRGB.",
                new HashMap<>(), true, 35, 4.8, 310));

        // cbv-11
        products.add(new Product("cbv-11", "Asus ROG Swift OLED PG27AQDM 240Hz", "monitor", "Màn Hình Gaming", "Asus",
                22990000, 24990000, "-8%", "PREMIUM OLED",
                "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
                Collections.singletonList("https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80"),
                "Màn hình OLED 27 inch 2K 240Hz với tốc độ phản hồi 0.03ms mang lại trải nghiệm đỉnh cao.",
                new HashMap<>(), true, 6, 5.0, 45));

        // cbv-12
        products.add(new Product("cbv-12", "Samsung Odyssey OLED G9 49 inch 240Hz", "monitor", "Màn Hình Gaming", "Samsung",
                32990000, 35990000, "-8%", "ULTRAWIDE",
                "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
                Collections.singletonList("https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"),
                "Màn hình cong kép siêu rộng 49 inch Dual QHD, tấm nền OLED tích hợp vi xử lý Neo Quantum.",
                new HashMap<>(), true, 4, 4.9, 29));

        // cbv-13
        products.add(new Product("cbv-13", "NVIDIA GeForce RTX 5090 32GB GDDR7", "gpu", "Card Màn Hình (GPU)", "Asus",
                59990000, 64990000, "-8%", "MONSTER GPU",
                "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80",
                Collections.singletonList("https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80"),
                "Quái vật đồ họa thế hệ mới với bộ nhớ 32GB GDDR7 và kiến trúc Blackwell tối tân.",
                new HashMap<>(), true, 3, 5.0, 18));

        // cbv-14
        products.add(new Product("cbv-14", "Colorful iGame RTX 4070 Super Ultra W OC", "gpu", "Card Màn Hình (GPU)", "Colorful",
                17490000, 18990000, "-8%", "HOT TREND",
                "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
                Collections.singletonList("https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"),
                "Card đồ họa tone màu trắng Holo Pop Art thời thượng, hiệu năng vượt trội cho Gaming 2K.",
                new HashMap<>(), true, 14, 4.8, 62));

        // cbv-15
        products.add(new Product("cbv-15", "MSI GeForce RTX 4080 Super Gaming X Trio", "gpu", "Card Màn Hình (GPU)", "MSI",
                28990000, 30990000, "-6%", "HIGH-END",
                "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80",
                Collections.singletonList("https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80"),
                "Tản nhiệt Tri Frozr 3 danh tiếng cực kỳ mát mẻ, cân mượt mọi tựa game AAA thiết lập 4K.",
                new HashMap<>(), true, 7, 4.9, 41));

        // cbv-16
        products.add(new Product("cbv-16", "Zotac Gaming RTX 4060 Ti Twin Edge 8GB", "gpu", "Card Màn Hình (GPU)", "Zotac",
                10490000, 11490000, "-9%", "BEST BUDGET",
                "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
                Collections.singletonList("https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"),
                "Kích thước nhỏ gọn 2 quạt phù hợp mọi vỏ case, tối ưu công suất và hỗ trợ DLSS 3.",
                new HashMap<>(), true, 22, 4.7, 88));

        // cbv-17
        products.add(new Product("cbv-17", "HyperX Cloud III Wireless Gaming Headset", "audio", "Tai Nghe Gaming", "HyperX",
                3490000, 3990000, "-13%", "LEGENDARY",
                "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
                Collections.singletonList("https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"),
                "Thời lượng pin vô địch lên tới 120 giờ, đệm tai mút hoạt tính êm ái cùng âm thanh DTS:X.",
                new HashMap<>(), true, 19, 4.8, 155));

        // cbv-18
        products.add(new Product("cbv-18", "SteelSeries Arctis Nova Pro Wireless", "audio", "Tai Nghe Gaming", "SteelSeries",
                8490000, 9290000, "-9%", "AUDIOPHILE",
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
                Collections.singletonList("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"),
                "Hệ thống âm thanh Nova Pro Acoustic System với chống ồn chủ động ANC và pin kép tráo đổi.",
                new HashMap<>(), true, 8, 4.9, 73));
    }

    public List<Product> filterProducts(String category, String brand, String search,
                                       String sort, Long minPrice, Long maxPrice) {
        synchronized (products) {
            List<Product> result = new ArrayList<>(products);

            // Filter category
            if (category != null && !category.isEmpty() && !"all".equalsIgnoreCase(category)) {
                result = result.stream()
                        .filter(p -> p.getCategory() != null && p.getCategory().equalsIgnoreCase(category))
                        .collect(Collectors.toList());
            }

            // Filter brand
            if (brand != null && !brand.isEmpty()) {
                result = result.stream()
                        .filter(p -> p.getBrand() != null && p.getBrand().equalsIgnoreCase(brand))
                        .collect(Collectors.toList());
            }

            // Search keyword
            if (search != null && !search.trim().isEmpty()) {
                String q = search.trim().toLowerCase();
                result = result.stream()
                        .filter(p -> (p.getName() != null && p.getName().toLowerCase().contains(q))
                                || (p.getBrand() != null && p.getBrand().toLowerCase().contains(q))
                                || (p.getCategoryName() != null && p.getCategoryName().toLowerCase().contains(q))
                                || (p.getDescription() != null && p.getDescription().toLowerCase().contains(q)))
                        .collect(Collectors.toList());
            }

            // Filter min/max price
            if (minPrice != null) {
                result = result.stream()
                        .filter(p -> p.getPrice() >= minPrice)
                        .collect(Collectors.toList());
            }
            if (maxPrice != null) {
                result = result.stream()
                        .filter(p -> p.getPrice() <= maxPrice)
                        .collect(Collectors.toList());
            }

            // Sort
            if ("price-asc".equalsIgnoreCase(sort)) {
                result.sort(Comparator.comparingLong(Product::getPrice));
            } else if ("price-desc".equalsIgnoreCase(sort)) {
                result.sort((a, b) -> Long.compare(b.getPrice(), a.getPrice()));
            } else if ("rating".equalsIgnoreCase(sort)) {
                result.sort((a, b) -> Double.compare(b.getRating(), a.getRating()));
            } else if ("reviews".equalsIgnoreCase(sort)) {
                result.sort((a, b) -> Integer.compare(b.getReviewsCount(), a.getReviewsCount()));
            }

            return result;
        }
    }

    public Product getProductById(String id) {
        if (id == null) return null;
        synchronized (products) {
            return products.stream()
                    .filter(p -> p.getId().equalsIgnoreCase(id))
                    .findFirst()
                    .orElse(null);
        }
    }

    public Product addProduct(Product product) {
        if (product == null) {
            throw new IllegalArgumentException("Dữ liệu sản phẩm không được rỗng");
        }
        if (product.getName() == null || product.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Tên sản phẩm không được để trống");
        }
        if (product.getPrice() <= 0) {
            throw new IllegalArgumentException("Giá bán sản phẩm phải lớn hơn 0");
        }
        if (product.getStockCount() < 0) {
            throw new IllegalArgumentException("Số lượng tồn kho không được âm");
        }
        if (product.getId() == null || product.getId().trim().isEmpty()) {
            product.setId("cbv-" + (products.size() + 1));
        }

        // Validate unique name
        boolean nameExists = products.stream()
                .anyMatch(p -> p.getName().trim().equalsIgnoreCase(product.getName().trim()));
        if (nameExists) {
            throw new IllegalStateException("Sản phẩm với tên '" + product.getName() + "' đã tồn tại");
        }

        products.add(product);
        return product;
    }

    public Product updateProduct(String id, Product updated) {
        Product existing = getProductById(id);
        if (existing == null) {
            throw new NoSuchElementException("Không tìm thấy sản phẩm có mã: " + id);
        }
        if (updated.getName() != null && !updated.getName().trim().isEmpty()) {
            existing.setName(updated.getName());
        }
        if (updated.getPrice() > 0) {
            existing.setPrice(updated.getPrice());
        }
        if (updated.getCategory() != null) {
            existing.setCategory(updated.getCategory());
        }
        if (updated.getBrand() != null) {
            existing.setBrand(updated.getBrand());
        }
        if (updated.getStockCount() >= 0) {
            existing.setStockCount(updated.getStockCount());
        }
        return existing;
    }

    public boolean deleteProduct(String id) {
        synchronized (products) {
            return products.removeIf(p -> p.getId().equalsIgnoreCase(id));
        }
    }

    public int getTotalCount() {
        return products.size();
    }

    public int getHotCount() {
        return (int) products.stream()
                .filter(p -> p.getBadge() != null && p.getBadge().contains("HOT"))
                .count();
    }
}

