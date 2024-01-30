package com.aunraza.ecommercebackend.controllers;

import com.aunraza.ecommercebackend.models.Category;
import com.aunraza.ecommercebackend.repositories.CategoryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/categories")
public class CategoryController {

    private CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("")
    public List<Category> retrieveAllCategories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/{categoryId}")
    public Category retrieveCategory(@PathVariable Integer categoryId) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        return category.orElse(null);
    }

    @PostMapping("")
    public void createCategory(@RequestBody Category category) {
        category.setId(null); // in case user pass id in body
        categoryRepository.save(category);
    }

    @PutMapping("/{categoryId}")
    public void modifyCategory(@PathVariable Integer categoryId,
                               @RequestBody Category modifiedCategory) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        if (category.isPresent()) {
            modifiedCategory.setId(categoryId);
            categoryRepository.save(modifiedCategory);
        }
    }

    @DeleteMapping("/{categoryId}")
    public void deleteCategory(@PathVariable Integer categoryId) {
        categoryRepository.deleteById(categoryId);
    }
}
