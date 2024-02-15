package com.aunraza.ecommercebackend.controllers;

import com.aunraza.ecommercebackend.models.CustomerOrder;
import com.aunraza.ecommercebackend.models.UserEntity;
import com.aunraza.ecommercebackend.repositories.CustomerOrderRepository;
import com.aunraza.ecommercebackend.repositories.OrderProductRepository;
import com.aunraza.ecommercebackend.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/orders")
public class OrderController {
    private CustomerOrderRepository customerOrderRepository;
    private OrderProductRepository orderProductRepository; // :TODO

    private UserRepository userRepository;

    public OrderController(CustomerOrderRepository customerOrderRepository, OrderProductRepository orderProductRepository, UserRepository userRepository) {
        this.customerOrderRepository = customerOrderRepository;
        this.orderProductRepository = orderProductRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("")
    public ResponseEntity<Object> retrieveAllOrders(Authentication authentication) {
        var optionalUser = findUser(authentication);
        if (optionalUser.isEmpty()) {
            return new ResponseEntity<>("Username does not exist in database", HttpStatus.NOT_FOUND);
        }
        var user = optionalUser.get();
        var userOrders = user.getOrders();
        return new ResponseEntity<>(userOrders, HttpStatus.OK);
    }

    @GetMapping("{orderId}")
    public ResponseEntity<Object> retrieveOrder(@PathVariable Integer orderId, Authentication authentication) {
        var optionalUser = findUser(authentication);
        if (optionalUser.isEmpty()) {
            return new ResponseEntity<>("Username does not exist in database", HttpStatus.NOT_FOUND);
        }
        var user = optionalUser.get();
        var userOrders = user.getOrders();
        var foundOrder = userOrders.stream().filter(order -> order.getId().equals(orderId)).findFirst();
        if (foundOrder.isPresent())
            return new ResponseEntity<>(foundOrder.get(), HttpStatus.OK);
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

    public Optional<UserEntity> findUser(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String username = userDetails.getUsername();
        return userRepository.findByUsername(username);
    }
}
