package com.aunraza.ecommercebackend.repositories;

import com.aunraza.ecommercebackend.models.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderProductRepository extends JpaRepository<OrderProduct, Integer> {
}
