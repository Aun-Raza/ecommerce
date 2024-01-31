package com.aunraza.ecommercebackend.controllers;

import com.aunraza.ecommercebackend.models.CustomerOrder;
import com.aunraza.ecommercebackend.repositories.CustomerOrderRepository;
import com.aunraza.ecommercebackend.repositories.OrderProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/orders")
public class OrderController {
    private CustomerOrderRepository customerOrderRepository;
    private OrderProductRepository orderProductRepository; // :TODO

    public OrderController(CustomerOrderRepository customerOrderRepository, OrderProductRepository orderProductRepository) {
        this.customerOrderRepository = customerOrderRepository;
        this.orderProductRepository = orderProductRepository;
    }

    @GetMapping("")
    public List<CustomerOrder> retrieveAllOrders() {
        return customerOrderRepository.findAll();
    }

    @GetMapping("{orderId}")
    public CustomerOrder retrieveOrder(@PathVariable Integer orderId) {
        Optional<CustomerOrder> order = customerOrderRepository.findById(orderId);
        return order.orElse(null);
    }

    @PostMapping("")
    public void createOrder(@RequestBody CustomerOrder order) {
        order.setId(null); // in case user pass id in body
        customerOrderRepository.save(order);
    }

    @PutMapping("{orderId}")
    public void modifyOrder(
            @PathVariable Integer orderId,
            @RequestBody CustomerOrder modifiedOrder) {
        Optional<CustomerOrder> order = customerOrderRepository.findById(orderId);
        if (order.isPresent()) {
            modifiedOrder.setId(orderId);
            // TODO: include list of order products
            customerOrderRepository.save(modifiedOrder);
        }
    }

    @DeleteMapping("{orderId}")
    public void deleteOrder(@PathVariable Integer orderId) {
        customerOrderRepository.deleteById(orderId);
    }
}
