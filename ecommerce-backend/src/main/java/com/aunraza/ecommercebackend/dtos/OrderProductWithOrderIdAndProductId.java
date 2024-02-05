package com.aunraza.ecommercebackend.dtos;

import com.aunraza.ecommercebackend.models.OrderProduct;

public class OrderProductWithOrderIdAndProductId {
    private OrderProduct orderProduct;
    private Integer productId;
    private Integer orderId;

    public OrderProduct getOrderProduct() {
        return orderProduct;
    }

    public void setOrderProduct(OrderProduct orderProduct) {
        this.orderProduct = orderProduct;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public OrderProductWithOrderIdAndProductId(OrderProduct orderProduct, Integer productId, Integer orderId) {
        this.orderProduct = orderProduct;
        this.productId = productId;
        this.orderId = orderId;
    }

    public OrderProductWithOrderIdAndProductId() {}
}
