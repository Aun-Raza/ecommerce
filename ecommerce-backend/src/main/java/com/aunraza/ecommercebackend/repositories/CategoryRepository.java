package com.aunraza.ecommercebackend.repositories;

import com.aunraza.ecommercebackend.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
