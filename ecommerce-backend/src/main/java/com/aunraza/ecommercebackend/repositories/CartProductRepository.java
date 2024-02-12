package com.aunraza.ecommercebackend.repositories;

import com.aunraza.ecommercebackend.models.CartProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartProductRepository extends JpaRepository<CartProduct, Integer> {
}
