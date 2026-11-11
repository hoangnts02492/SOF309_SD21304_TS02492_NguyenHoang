package com.poly.sof309.models;

import java.util.List;
import java.util.Map;

public class Product {
    private String id;
    private String name;
    private String category;
    private String categoryName;
    private String brand;
    private long price;
    private long oldPrice;
    private String discount;
    private String badge;
    private String image;
    private List<String> gallery;
    private String description;
    private Map<String, String> specs;
    private boolean inStock;
    private int stockCount;
    private double rating;
    private int reviewsCount;

    public Product() {
    }

    public Product(String id, String name, String category, String categoryName, String brand,
                   long price, long oldPrice, String discount, String badge, String image,
                   List<String> gallery, String description, Map<String, String> specs,
                   boolean inStock, int stockCount, double rating, int reviewsCount) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.categoryName = categoryName;
        this.brand = brand;
        this.price = price;
        this.oldPrice = oldPrice;
        this.discount = discount;
        this.badge = badge;
        this.image = image;
        this.gallery = gallery;
        this.description = description;
        this.specs = specs;
        this.inStock = inStock;
        this.stockCount = stockCount;
        this.rating = rating;
        this.reviewsCount = reviewsCount;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public long getPrice() {
        return price;
    }

    public void setPrice(long price) {
        this.price = price;
    }

    public long getOldPrice() {
        return oldPrice;
    }

    public void setOldPrice(long oldPrice) {
        this.oldPrice = oldPrice;
    }

    public String getDiscount() {
        return discount;
    }

    public void setDiscount(String discount) {
        this.discount = discount;
    }

    public String getBadge() {
        return badge;
    }

    public void setBadge(String badge) {
        this.badge = badge;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<String> getGallery() {
        return gallery;
    }

    public void setGallery(List<String> gallery) {
        this.gallery = gallery;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Map<String, String> getSpecs() {
        return specs;
    }

    public void setSpecs(Map<String, String> specs) {
        this.specs = specs;
    }

    public boolean isInStock() {
        return inStock;
    }

    public void setInStock(boolean inStock) {
        this.inStock = inStock;
    }

    public int getStockCount() {
        return stockCount;
    }

    public void setStockCount(int stockCount) {
        this.stockCount = stockCount;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public int getReviewsCount() {
        return reviewsCount;
    }

    public void setReviewsCount(int reviewsCount) {
        this.reviewsCount = reviewsCount;
    }
}

