package com.aunraza.ecommercebackend.dtos.categories;

public class CategoryDto {
    private String name;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CategoryDto(String name) {
        this.name = name;
    }

    public CategoryDto() {}
}
