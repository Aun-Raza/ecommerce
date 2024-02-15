package com.aunraza.ecommercebackend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Product {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private String description;
    private Double price;
    @ManyToOne
    @JsonManagedReference
    private Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<OrderProduct> orderProducts;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    List<CartProduct> cardProducts;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<OrderProduct> getOrderProducts() {
        return orderProducts;
    }

    public void setOrderProducts(List<OrderProduct> orderProducts) {
        this.orderProducts = orderProducts;
    }

    public List<CartProduct> getCardProducts() {
        return cardProducts;
    }

    public void setCardProducts(List<CartProduct> cardProducts) {
        this.cardProducts = cardProducts;
    }

    public Product() {}

    public Product(Integer id, String name, String description, Double price, Category category, List<OrderProduct> orderProducts, List<CartProduct> cardProducts) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.orderProducts = orderProducts;
        this.cardProducts = cardProducts;
    }
}
