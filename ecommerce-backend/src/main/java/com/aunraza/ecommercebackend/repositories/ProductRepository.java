package com.aunraza.ecommercebackend.repositories;

import com.aunraza.ecommercebackend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
