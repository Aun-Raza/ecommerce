package com.aunraza.ecommercebackend.controllers;

import com.aunraza.ecommercebackend.models.OrderProduct;
import com.aunraza.ecommercebackend.repositories.CustomerOrderRepository;
import com.aunraza.ecommercebackend.repositories.OrderProductRepository;
import com.aunraza.ecommercebackend.repositories.ProductRepository;
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
    public List<OrderProduct> retrieveAllOrderProducts() {
        return orderProductRepository.findAll();
    }

    @GetMapping("/{orderProductId}")
    public OrderProduct retrieveOrderProduct(@PathVariable Integer orderProductId) {
        Optional<OrderProduct> orderProduct = orderProductRepository.findById(orderProductId);
        return orderProduct.orElse(null);
    }

    @PostMapping("/{orderId}/{productId}")
    public void createOrderProduct(
            @PathVariable Integer orderId,
            @PathVariable Integer productId,
            @RequestBody OrderProduct orderProduct) {

        var foundOrder = customerOrderRepository.findById(orderId);
        var foundProduct = productRepository.findById(productId);

        if (foundOrder.isPresent() && foundProduct.isPresent()) {
            orderProduct.setId(null); // in case user pass id in body
            orderProductRepository.save(orderProduct);
        }
    }

    @PutMapping("/{orderProductId}")
    public void modifyOrderProduct(@PathVariable Integer orderProductId,
                               @RequestBody OrderProduct modifiedOrderProduct) {
        Optional<OrderProduct> orderProduct = orderProductRepository.findById(orderProductId);
        if (orderProduct.isPresent()) {
            modifiedOrderProduct.setId(orderProductId);
            orderProductRepository.save(modifiedOrderProduct);
        }
    }

    @DeleteMapping("/{orderProductId}")
    public void deleteOrderProduct(@PathVariable Integer orderProductId) {
        orderProductRepository.deleteById(orderProductId);
    }
}
