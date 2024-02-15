package com.aunraza.ecommercebackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class CustomerOrder {
    @Id
    @GeneratedValue
    private Integer id;
    private Double subtotal;
    private Double tax;
    private Double total;

    @OneToMany(mappedBy = "order")
    @JsonManagedReference
    private List<OrderProduct> products;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private UserEntity user;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }

    public Double getTax() {
        return tax;
    }

    public void setTax(Double tax) {
        this.tax = tax;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public List<OrderProduct> getProducts() {
        return products;
    }

    public void setProducts(List<OrderProduct> products) {
        this.products = products;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public CustomerOrder(Integer id, Double subtotal, Double tax, Double total, List<OrderProduct> products, UserEntity user) {
        this.id = id;
        this.subtotal = subtotal;
        this.tax = tax;
        this.total = total;
        this.products = products;
        this.user = user;
    }

    public CustomerOrder() {}
}
