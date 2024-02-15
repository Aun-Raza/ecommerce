package com.aunraza.ecommercebackend.repositories;

import com.aunraza.ecommercebackend.models.CartProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartProductRepository extends JpaRepository<CartProduct, Integer> {
}
