package com.aunraza.ecommercebackend.controllers;

import com.aunraza.ecommercebackend.dtos.ProductWithCategoryId;
import com.aunraza.ecommercebackend.models.Category;
import com.aunraza.ecommercebackend.models.Product;
import com.aunraza.ecommercebackend.repositories.CategoryRepository;
import com.aunraza.ecommercebackend.repositories.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<Product>> retrieveAllProducts(@RequestParam Optional<String> category) {
        List<Product> products = productRepository.findAll();
        if (category.isPresent()) {
            products = products.stream().filter(
                product -> product.getCategory().getName()
                    .equals(category.get())).toList();
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Product> retrieveProduct(@PathVariable Integer productId) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent())
            return new ResponseEntity<>(product.get(), HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("")
    public ResponseEntity<Product> createProduct(@RequestBody ProductWithCategoryId request) {
        Optional<Category> category = categoryRepository.findById(request.getCategoryId());
        if (category.isPresent()) {
            var product = request.getProduct();
            product.setId(null); // in case user pass id in body
            product.setCategory(category.get());
            var createdProduct = productRepository.save(product);
            return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{productId}")
    public ResponseEntity<Product> modifyProduct(
            @PathVariable Integer productId,
           @RequestBody ProductWithCategoryId request) {
        Optional<Category> category = categoryRepository.findById(request.getCategoryId());
        Optional<Product> product = productRepository.findById(productId);
        if (category.isPresent() && product.isPresent()) {
            var modifiedProduct = request.getProduct();
            modifiedProduct.setId(productId);
            modifiedProduct.setCategory(category.get());
            productRepository.save(modifiedProduct);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Object> deleteProduct(@PathVariable Integer productId) {
        productRepository.deleteById(productId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
