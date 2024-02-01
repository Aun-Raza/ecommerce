package com.aunraza.ecommercebackend.controllers;

import com.aunraza.ecommercebackend.dtos.ProductWithCategoryId;
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
    public List<Product> retrieveAllProducts(@RequestParam Optional<String> category) {
        List<Product> products = productRepository.findAll();
        if (category.isPresent()) {
            return products.stream().filter(
                product -> product.getCategory().getName()
                    .equals(category.get())).toList();
        }
        else return products;
    }

    @GetMapping("/{productId}")
    public Product retrieveProduct(@PathVariable Integer productId) {
        Optional<Product> product = productRepository.findById(productId);
        return product.orElse(null);
    }

    @PostMapping("")
    public void createProduct(@RequestBody ProductWithCategoryId request) {
        Optional<Category> category = categoryRepository.findById(request.getCategoryId());
        if (category.isPresent()) {
            var product = request.getProduct();
            product.setId(null); // in case user pass id in body
            product.setCategory(category.get());
            productRepository.save(product);
        }
    }

    @PutMapping("/{productId}")
    public void modifyProduct(
            @PathVariable Integer productId,
           @RequestBody ProductWithCategoryId request) {
        Optional<Category> category = categoryRepository.findById(request.getCategoryId());
        Optional<Product> product = productRepository.findById(productId);
        if (category.isPresent() && product.isPresent()) {
            var modifiedProduct = request.getProduct();
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
