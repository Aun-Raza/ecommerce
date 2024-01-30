package com.aunraza.ecommercebackend.controllers;

import com.aunraza.ecommercebackend.models.Category;
import com.aunraza.ecommercebackend.models.Product;
import com.aunraza.ecommercebackend.repositories.CategoryRepository;
import com.aunraza.ecommercebackend.repositories.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/products")
public class ProductController {
    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;

    public ProductController(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("")
    public List<Product> retrieveAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/{productId}")
    public Product retrieveProduct(@PathVariable Integer productId) {
        Optional<Product> product = productRepository.findById(productId);
        return product.orElse(null);
    }

    @PostMapping("/{categoryId}")
    public void createProduct(@RequestBody Product product,
                              @PathVariable Integer categoryId) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        if (category.isPresent()) {
            product.setId(null); // in case user pass id in body
            product.setCategory(category.get());
            productRepository.save(product);
        }
    }

    @PutMapping("{categoryId}/{productId}")
    public void modifyProduct(
            @PathVariable Integer categoryId,
            @PathVariable Integer productId,
           @RequestBody Product modifiedProduct) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        Optional<Product> product = productRepository.findById(productId);
        if (category.isPresent() && product.isPresent()) {
            modifiedProduct.setId(productId);
            modifiedProduct.setCategory(category.get());
            productRepository.save(modifiedProduct);
        }
    }

    @DeleteMapping("/{productId}")
    public void deleteProduct(@PathVariable Integer productId) {
        productRepository.deleteById(productId);
    }
}
