package com.aunraza.ecommercebackend.controllers;

import com.aunraza.ecommercebackend.models.CustomerOrder;
import com.aunraza.ecommercebackend.repositories.CustomerOrderRepository;
import com.aunraza.ecommercebackend.repositories.OrderProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<CustomerOrder>> retrieveAllOrders() {
        return new ResponseEntity<>(customerOrderRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("{orderId}")
    public ResponseEntity<CustomerOrder> retrieveOrder(@PathVariable Integer orderId) {
        Optional<CustomerOrder> order = customerOrderRepository.findById(orderId);
        if (order.isPresent())
            return new ResponseEntity<>(order.get(), HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("")
    public ResponseEntity<CustomerOrder> createOrder(@RequestBody CustomerOrder order) {
        order.setId(null); // in case user pass id in body
        var createdOrder = customerOrderRepository.save(order);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    @PutMapping("{orderId}")
    public ResponseEntity<CustomerOrder> modifyOrder(
            @PathVariable Integer orderId,
            @RequestBody CustomerOrder modifiedOrder) {
        Optional<CustomerOrder> order = customerOrderRepository.findById(orderId);
        if (order.isPresent()) {
            modifiedOrder.setId(orderId);
            // TODO: include list of order products
            customerOrderRepository.save(modifiedOrder);
            return new ResponseEntity<>(modifiedOrder, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("{orderId}")
    public ResponseEntity<Object> deleteOrder(@PathVariable Integer orderId) {
        customerOrderRepository.deleteById(orderId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
