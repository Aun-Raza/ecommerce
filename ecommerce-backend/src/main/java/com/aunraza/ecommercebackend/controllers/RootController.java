package com.aunraza.ecommercebackend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {
    @GetMapping("/")
    public String returnSuccessForRootUrl() {
        return "Success";
    }
}
