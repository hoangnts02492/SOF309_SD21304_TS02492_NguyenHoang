package com.poly.sof309.models;

import java.util.List;

public class Category {
    private String id;
    private String name;
    private String desc;
    private String image;
    private List<String> brands;

    public Category() {
    }

    public Category(String id, String name, String desc, String image, List<String> brands) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.image = image;
        this.brands = brands;
    }

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

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<String> getBrands() {
        return brands;
    }

    public void setBrands(List<String> brands) {
        this.brands = brands;
    }
}

