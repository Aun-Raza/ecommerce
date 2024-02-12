package com.aunraza.ecommercebackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class CartProduct {
    @Id
    @GeneratedValue
    private Integer id;
    private Double price;
    private Integer quantity;
    @ManyToOne
    @JoinColumn(name = "card_id")
    @JsonIgnore
    private Cart cart;
    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public CartProduct(Integer id, Double price, Integer quantity, Cart cart, Product product) {
        this.id = id;
        this.price = price;
        this.quantity = quantity;
        this.cart = cart;
        this.product = product;
    }

    public CartProduct() {}
}
