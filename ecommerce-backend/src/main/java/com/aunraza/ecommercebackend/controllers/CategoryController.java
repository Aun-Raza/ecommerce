package com.aunraza.ecommercebackend.controllers;

import com.aunraza.ecommercebackend.models.Category;
import com.aunraza.ecommercebackend.repositories.CategoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<Category>> retrieveAllCategories() {
        return new ResponseEntity<>(categoryRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<Category> retrieveCategory(@PathVariable Integer categoryId) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        if (category.isPresent())
            return new ResponseEntity<>(category.get(), HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("")
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        category.setId(null); // in case user pass id in body
        var createdCategory = categoryRepository.save(category);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<Category> modifyCategory(@PathVariable Integer categoryId,
                               @RequestBody Category modifiedCategory) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        if (category.isPresent()) {
            modifiedCategory.setId(categoryId);
            categoryRepository.save(modifiedCategory);
            return new ResponseEntity<>(modifiedCategory, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Object> deleteCategory(@PathVariable Integer categoryId) {
        categoryRepository.deleteById(categoryId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
