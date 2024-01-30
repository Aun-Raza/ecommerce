package com.aunraza.ecommercebackend.controllers;

import com.aunraza.ecommercebackend.models.Category;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/categories")
public class CategoryController {
    private static int count;
    private static List<Category> categories = new ArrayList<>(List.of(
            new Category(++count, "Digital Watch"),
            new Category(++count, "Smartphone"),
            new Category(++count, "Tablet"),
            new Category(++count, "Headphone")
    ));
    @GetMapping("")
    public List<Category> retrieveAllCategories() {
        return categories;
    }

    @GetMapping("/{categoryId}")
    public Category retrieveCategory(@PathVariable Integer categoryId) {
        Optional<Category> foundCategory = categories.stream().filter(
                category -> category.getId().equals(categoryId))
                .findFirst();
        return foundCategory.orElse(null);
    }

    @PostMapping("")
    public void createCategory(@RequestBody Category category) {
        category.setId(++count);
        categories.add(category);
    }

    @PutMapping("/{categoryId}")
    public void modifyCategory(@PathVariable Integer categoryId,
                               @RequestBody Category modifiedCategory) {
        Optional<Category> foundCategory = categories.stream().filter(
                        category -> category.getId().equals(categoryId))
                .findFirst();
        foundCategory.ifPresent(category -> category.setName(modifiedCategory.getName()));
    }

    @DeleteMapping("/{categoryId}")
    public void deleteCategory(@PathVariable Integer categoryId) {
        categories.removeIf(category -> category.getId().equals(categoryId));
    }
}
