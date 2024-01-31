package com.aunraza.ecommercebackend.repositories;

import com.aunraza.ecommercebackend.models.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Integer> {
}
