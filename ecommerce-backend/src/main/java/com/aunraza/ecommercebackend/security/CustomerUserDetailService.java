package com.aunraza.ecommercebackend.security;

import com.aunraza.ecommercebackend.models.Role;
import com.aunraza.ecommercebackend.models.UserEntity;
import com.aunraza.ecommercebackend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerUserDetailService implements UserDetailsService {
    private UserRepository userRepository;
    @Autowired
    public CustomerUserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepository
            .findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("Username not found"));
        return new User(
            user.getUsername(),
            user.getPassword(),
            mapRolesToAuthorities(user.getRoles()));

    }

    private Collection<GrantedAuthority> mapRolesToAuthorities(List<Role> roles) {
        return roles.stream().map(
            role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
    };
}
