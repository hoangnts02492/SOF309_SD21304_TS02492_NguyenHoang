package com.poly.sof309.services;

import com.poly.sof309.models.Category;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class CategoryService {
    private final List<Category> categories = new ArrayList<>();

    public CategoryService() {
        initCategories();
    }

    private void initCategories() {
        categories.add(new Category(
                "mouse",
                "Chuột Gaming",
                "Cảm biến quang học cao cấp, trọng lượng siêu nhẹ dưới 60g",
                "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
                Arrays.asList("Logitech", "Razer", "ATK", "Mchose")
        ));
        categories.add(new Category(
                "keyboard",
                "Bàn Phím Cơ",
                "Switch từ tính Rapid Trigger & nhôm CNC nguyên khối",
                "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
                Arrays.asList("Wooting", "ATK", "Mchose", "Razer")
        ));
        categories.add(new Category(
                "monitor",
                "Màn Hình Gaming",
                "Tần số quét 165Hz - 360Hz & tấm nền OLED siêu thực",
                "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
                Arrays.asList("Zowie", "AOC", "Asus", "Samsung")
        ));
        categories.add(new Category(
                "gpu",
                "Card Màn Hình (GPU)",
                "Kiến trúc tối tân phục vụ Gaming 4K đỉnh cao & AI Workloads",
                "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80",
                Arrays.asList("Asus", "Colorful", "MSI", "Zotac")
        ));
        categories.add(new Category(
                "audio",
                "Tai Nghe Gaming",
                "Âm thanh vòm không gian, định vị tiếng bước chân chuẩn xác",
                "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
                Arrays.asList("HyperX", "SteelSeries", "Logitech", "Razer")
        ));
    }

    public List<Category> getAllCategories() {
        return new ArrayList<>(categories);
    }

    public Category getCategoryById(String id) {
        return categories.stream()
                .filter(c -> c.getId().equalsIgnoreCase(id))
                .findFirst()
                .orElse(null);
    }
}

