package com.aunraza.ecommercebackend.controllers;

import com.aunraza.ecommercebackend.dtos.categories.CategoryDto;
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
    public ResponseEntity<Category> createCategory(@RequestBody CategoryDto category) {
        var newCategory = new Category();
        newCategory.setId(null);
        newCategory.setName(category.getName());
        var createdCategory = categoryRepository.save(newCategory);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<Category> modifyCategory(@PathVariable Integer categoryId,
                               @RequestBody CategoryDto category) {
        Optional<Category> foundCategory = categoryRepository.findById(categoryId);
        if (foundCategory.isPresent()) {
            var modifiedCategory = foundCategory.get();
            modifiedCategory.setName(category.getName());
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
