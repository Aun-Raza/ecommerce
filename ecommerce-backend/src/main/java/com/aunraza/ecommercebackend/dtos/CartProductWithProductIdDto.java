package com.aunraza.ecommercebackend.dtos;

import com.aunraza.ecommercebackend.models.CartProduct;

public class CartProductWithProductIdDto {
    private CartProduct cartProduct;
    private Integer productId;

    public CartProduct getCartProduct() {
        return cartProduct;
    }

    public void setCartProduct(CartProduct cartProduct) {
        this.cartProduct = cartProduct;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public CartProductWithProductIdDto(CartProduct cartProduct, Integer productId, Integer cartId) {
        this.cartProduct = cartProduct;
        this.productId = productId;
    }

    public CartProductWithProductIdDto() {}
}
