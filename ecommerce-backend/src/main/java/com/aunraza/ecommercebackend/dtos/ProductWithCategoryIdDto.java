package com.aunraza.ecommercebackend.dtos;

public class ProductWithCategoryIdDto {
    private String name;
    private String description;
    private Double price;
    private Integer categoryId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public ProductWithCategoryIdDto(String name, String description, Double price, Integer categoryId) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.categoryId = categoryId;
    }

    public ProductWithCategoryIdDto() {}
}
