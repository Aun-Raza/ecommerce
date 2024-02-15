package com.aunraza.ecommercebackend.controllers;

import com.aunraza.ecommercebackend.dtos.CartProductWithProductIdDto;
import com.aunraza.ecommercebackend.models.*;
import com.aunraza.ecommercebackend.repositories.*;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/cart")
public class CartController {
    private CartRepository cartRepository;
    private CartProductRepository cartProductRepository;
    private ProductRepository productRepository;
    private UserRepository userRepository;

    private CustomerOrderRepository customerOrderRepository;

    private OrderProductRepository orderProductRepository;
    private EntityManager entityManager;
    public CartController(CartRepository cartRepository, CartProductRepository cartProductRepository, ProductRepository productRepository, UserRepository userRepository, CustomerOrderRepository customerOrderRepository, OrderProductRepository orderProductRepository, EntityManager entityManager) {
        this.cartRepository = cartRepository;
        this.cartProductRepository = cartProductRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.customerOrderRepository = customerOrderRepository;
        this.orderProductRepository = orderProductRepository;
        this.entityManager = entityManager;
    }
    @GetMapping("")
    public ResponseEntity<Object> retrieveCartProducts(Authentication authentication) {
        var optionalUser = findUser(authentication);
        if (optionalUser.isEmpty()) {
            return new ResponseEntity<>("Username does not exist in database", HttpStatus.NOT_FOUND);
        }
        var user = optionalUser.get();
        Cart cart = user.getCart();
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @PostMapping("")
    @Transactional
    public ResponseEntity<Object> createCartProduct(@RequestBody CartProductWithProductIdDto request, Authentication authentication) {
        var optionalUser = findUser(authentication);
        if (optionalUser.isEmpty()) {
            return new ResponseEntity<>("Username does not exist in database", HttpStatus.NOT_FOUND);
        }
        var user = optionalUser.get();
        Cart cart = user.getCart();
        cart.setSubtotal(100.00);
        cart.setTax(10.00);
        cart.setTotal(110.00);

        var optionalCartProduct = cart.getProducts().stream().filter(
                product -> product.getProduct().getId().equals(
                        request.getProductId())).findAny();
        CartProduct cartProduct;
        // if cart product item exist
        if (optionalCartProduct.isPresent()) {
            cartProduct = optionalCartProduct.get();
            var incrementQuantity = cartProduct.getQuantity() + 1;
            var newPrice = cartProduct.getPrice() * 2;
            cartProduct.setQuantity(incrementQuantity);
            cartProduct.setPrice(newPrice);
        }
        else {
            var optionalProduct = productRepository.findById(request.getProductId());
            if (optionalProduct.isEmpty()) {
                return new ResponseEntity<>("Product does not exist in database", HttpStatus.NOT_FOUND);
            }
            var product = optionalProduct.get();
            cartProduct = new CartProduct();
            cartProduct.setProduct(product);
            cartProduct.setCart(cart);
            cartProduct.setQuantity(request.getQuantity());
            cartProduct.setPrice(request.getPrice());
        }
        cartRepository.save(cart);
        entityManager.flush();
        cartProductRepository.save(cartProduct);
        entityManager.refresh(cart);
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @GetMapping("/checkout")
    @Transactional
    public ResponseEntity<Object> checkoutCart(Authentication authentication) {
        var optionalUser = findUser(authentication);
        if (optionalUser.isEmpty()) {
            return new ResponseEntity<>("Username does not exist in database", HttpStatus.NOT_FOUND);
        }
        var user = optionalUser.get();
        Cart cart = user.getCart();
        var cartProducts = cart.getProducts();
        if (cartProducts.isEmpty()) {
            return new ResponseEntity<>("Item(s) need to be added to cart", HttpStatus.BAD_REQUEST);
        }
        cartProductRepository.deleteAllInBatch(cartProducts);

        var newOrder = new CustomerOrder();
        newOrder.setUser(user);
        newOrder.setSubtotal(cart.getSubtotal());
        newOrder.setTax(cart.getTax());
        newOrder.setTotal(cart.getTotal());
        var createdOrder = customerOrderRepository.save(newOrder);

        List<OrderProduct> orderProducts = new ArrayList<>();
        for (var cartProduct : cartProducts) {
            var orderProduct = new OrderProduct();
            orderProduct.setProduct(cartProduct.getProduct());
            orderProduct.setQuantity(cartProduct.getQuantity());
            orderProduct.setPrice(cartProduct.getPrice());
            orderProduct.setOrder(createdOrder);
            orderProducts.add(orderProduct);
        }

        orderProductRepository.saveAll(orderProducts);

        entityManager.refresh(cart);
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    public Optional<UserEntity> findUser(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String username = userDetails.getUsername();
        return userRepository.findByUsername(username);
    }
}
