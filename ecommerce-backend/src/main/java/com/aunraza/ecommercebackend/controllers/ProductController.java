package com.aunraza.ecommercebackend.controllers;

import com.aunraza.ecommercebackend.models.Category;
import com.aunraza.ecommercebackend.models.Product;
import com.aunraza.ecommercebackend.repositories.CategoryRepository;
import com.aunraza.ecommercebackend.repositories.ProductRepository;
import com.aunraza.ecommercebackend.s3.S3Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(path = "api/products")
public class ProductController {
    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;

    private S3Service s3Service;

    public ProductController(ProductRepository productRepository, CategoryRepository categoryRepository, S3Service s3Service) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.s3Service = s3Service;
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

    @PostMapping()
    public ResponseEntity<Product> createProduct(@RequestParam("file") MultipartFile file,
                                                 @RequestParam("name") String name,
                                                 @RequestParam("description") String description,
                                                 @RequestParam("price") Double price,
                                                 @RequestParam("categoryId") Integer categoryId,
                                                 Authentication authentication) {
        var username = ((UserDetails) authentication.getPrincipal()).getUsername();

        Optional<Category> category = categoryRepository.findById(categoryId);
        if (category.isPresent()) {
            String imageUrl;
            try {

                if (!file.getContentType().equals(MediaType.IMAGE_JPEG_VALUE)
                        && !file.getContentType().equals(MediaType.IMAGE_PNG_VALUE)) {
                    throw new IllegalArgumentException("Only JPEG and PNG images are allowed.");
                }
                var key = username + "/" + file.getOriginalFilename() + UUID.randomUUID().toString();
                String fileExtension = StringUtils.getFilenameExtension(file.getOriginalFilename());
                var keyWithExtension = key + "." + fileExtension;
                imageUrl = s3Service.putObject(keyWithExtension, file);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            var newProduct = new Product();
            newProduct.setName(name);
            newProduct.setDescription(description);
            newProduct.setPrice(price);
            newProduct.setCategory(category.get());
            newProduct.setImageUrl(imageUrl);
            var createdProduct = productRepository.save(newProduct);
            return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{productId}")
    public ResponseEntity<Product> modifyProduct(
            @PathVariable Integer productId,
            @RequestParam("file") Optional<MultipartFile> file,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam("categoryId") Integer categoryId,
            Authentication authentication) {
        var username = ((UserDetails) authentication.getPrincipal()).getUsername();
        Optional<Category> category = categoryRepository.findById(categoryId);
        Optional<Product> foundProduct = productRepository.findById(productId);
        if (category.isPresent() && foundProduct.isPresent()) {
            var modifiedProduct = foundProduct.get();
            String newImageUrl;
            try {
                if (file.isPresent()) {
                    if (!file.get().getContentType().equals(MediaType.IMAGE_JPEG_VALUE)
                            && !file.get().getContentType().equals(MediaType.IMAGE_PNG_VALUE)) {
                        throw new IllegalArgumentException("Only JPEG and PNG images are allowed.");
                    }

                    var imageUrl = foundProduct.get().getImageUrl();
                    String[] segments = imageUrl.split("amazonaws.com/");
                    var oldKey = segments[segments.length -1];
                    s3Service.deleteObject(oldKey);

                    var newKey = username + "/" + file.get().getOriginalFilename() + UUID.randomUUID().toString();
                    String fileExtension = StringUtils.getFilenameExtension(file.get().getOriginalFilename());
                    var keyWithExtension = newKey + "." + fileExtension;
                    newImageUrl = s3Service.putObject(keyWithExtension, file.get());
                    modifiedProduct.setImageUrl(newImageUrl);
                }
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            modifiedProduct.setName(name);
            modifiedProduct.setDescription(description);
            modifiedProduct.setPrice(price);
            modifiedProduct.setCategory(category.get());

            productRepository.save(modifiedProduct);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Object> deleteProduct(@PathVariable Integer productId) {
        var optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isPresent()) {
            var imageUrl = optionalProduct.get().getImageUrl();
            String[] segments = imageUrl.split("amazonaws.com/");
            var key = segments[segments.length -1];
            try {
                s3Service.deleteObject(key);
            } catch (Exception e) {
                return new ResponseEntity<>("S3 fail to delete object", HttpStatus.BAD_REQUEST);
            }
            productRepository.deleteById(productId);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>("Product with id cannot be found", HttpStatus.NOT_FOUND);
    }
}
