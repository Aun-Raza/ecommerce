package com.aunraza.ecommercebackend.controllers;

import com.aunraza.ecommercebackend.dtos.AuthResponseDto;
import com.aunraza.ecommercebackend.dtos.RegisterDto;
import com.aunraza.ecommercebackend.models.Cart;
import com.aunraza.ecommercebackend.models.Role;
import com.aunraza.ecommercebackend.models.UserEntity;
import com.aunraza.ecommercebackend.repositories.CartRepository;
import com.aunraza.ecommercebackend.repositories.RoleRepository;
import com.aunraza.ecommercebackend.repositories.UserRepository;
import com.aunraza.ecommercebackend.security.JwtGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/auth")
public class AuthController {
    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private RoleRepository roleRepository;

    private CartRepository cartRepository;
    private PasswordEncoder passwordEncoder;
    private JwtGenerator jwtGenerator;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager,
                          UserRepository userRepository,
                          RoleRepository roleRepository,
                          CartRepository cartRepository, PasswordEncoder passwordEncoder,
                          JwtGenerator jwtGenerator) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.cartRepository = cartRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        if (userRepository.existsByUsername(registerDto.getUsername())) {
            return new ResponseEntity<>("Username is taken!", HttpStatus.BAD_REQUEST);
        }
        UserEntity user = new UserEntity();
        user.setUsername(registerDto.getUsername());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        Optional<Role> optionalRole = roleRepository.findByName("USER");
        Role role;
        if (optionalRole.isPresent()) {
            role = optionalRole.get();
        } else {
            // Create a new "USER" and "ADMIN" roles if they do not exist
            var userRole = new Role();
            userRole.setName("USER");
            var adminRole = new Role();
            adminRole.setName("ADMIN");
            roleRepository.save(userRole);
            roleRepository.save(adminRole);
        }

        // Save the user to the database
        userRepository.save(user);

        var cart = new Cart();
        cart.setUser(user);

        cartRepository.save(cart);

        // Update the user's cart
        user.setCart(cart);
        userRepository.save(user);

        return new ResponseEntity<>("User registered success!", HttpStatus.OK);
    }

    @PostMapping("login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody RegisterDto loginDto) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        return new ResponseEntity<>(new AuthResponseDto(token), HttpStatus.OK);
    }
}
