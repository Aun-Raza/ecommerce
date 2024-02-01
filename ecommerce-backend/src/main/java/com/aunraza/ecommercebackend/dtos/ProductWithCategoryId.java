package com.aunraza.ecommercebackend.dtos;

import com.aunraza.ecommercebackend.models.Product;

public class ProductWithCategoryId {
    private Product product;
    private Integer categoryId;

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public ProductWithCategoryId(Product product, Integer categoryId) {
        this.product = product;
        this.categoryId = categoryId;
    }

    public ProductWithCategoryId() {}
}
