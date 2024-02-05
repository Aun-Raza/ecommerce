package com.aunraza.ecommercebackend.controllers;

import com.aunraza.ecommercebackend.dtos.OrderProductWithOrderIdAndProductId;
import com.aunraza.ecommercebackend.models.OrderProduct;
import com.aunraza.ecommercebackend.repositories.CustomerOrderRepository;
import com.aunraza.ecommercebackend.repositories.OrderProductRepository;
import com.aunraza.ecommercebackend.repositories.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/orderProducts")
public class OrderProductController {
    private OrderProductRepository orderProductRepository;
    private ProductRepository productRepository;
    private CustomerOrderRepository customerOrderRepository;


    public OrderProductController(OrderProductRepository orderProductRepository, ProductRepository productRepository, CustomerOrderRepository customerOrderRepository) {
        this.orderProductRepository = orderProductRepository;
        this.productRepository = productRepository;
        this.customerOrderRepository = customerOrderRepository;
    }

    @GetMapping("")
    public ResponseEntity<List<OrderProduct>> retrieveAllOrderProducts() {
        return new ResponseEntity<>(orderProductRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{orderProductId}")
    public ResponseEntity<OrderProduct> retrieveOrderProduct(@PathVariable Integer orderProductId) {
        Optional<OrderProduct> orderProduct = orderProductRepository.findById(orderProductId);
        if (orderProduct.isPresent())
            return new ResponseEntity<>(orderProduct.get(), HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("")
    public ResponseEntity<OrderProduct> createOrderProduct(
            @RequestBody OrderProductWithOrderIdAndProductId request) {

        var foundOrder = customerOrderRepository.findById(request.getOrderId());
        var foundProduct = productRepository.findById(request.getProductId());

        if (foundOrder.isPresent() && foundProduct.isPresent()) {
            var orderProduct =request.getOrderProduct(); // in case user pass id in body
            orderProduct.setId(null);
            orderProduct.setOrder(foundOrder.get());
            orderProduct.setProduct(foundProduct.get());
            var createdOrderProduct = orderProductRepository.save(orderProduct);
            return new ResponseEntity<>(createdOrderProduct, HttpStatus.CREATED);
        }
        return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{orderProductId}")
    public ResponseEntity<OrderProduct> modifyOrderProduct(@PathVariable Integer orderProductId,
                               @RequestBody OrderProduct modifiedOrderProduct) {
        Optional<OrderProduct> orderProduct = orderProductRepository.findById(orderProductId);
        if (orderProduct.isPresent()) {
            modifiedOrderProduct.setId(orderProductId);
            orderProductRepository.save(modifiedOrderProduct);
            return new ResponseEntity<>(modifiedOrderProduct, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{orderProductId}")
    public ResponseEntity<Object> deleteOrderProduct(@PathVariable Integer orderProductId) {
        orderProductRepository.deleteById(orderProductId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
