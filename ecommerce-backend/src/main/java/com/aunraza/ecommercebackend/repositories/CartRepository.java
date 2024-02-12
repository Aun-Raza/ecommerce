package com.aunraza.ecommercebackend.repositories;

import com.aunraza.ecommercebackend.models.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Integer> {

}
