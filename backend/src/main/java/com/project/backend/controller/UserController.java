package com.project.backend.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.model.dto.UserDto;

@RestController
@RequestMapping("/users")
public interface UserController {

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    ResponseEntity<UserDto> create(@RequestBody UserDto newUser);

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping
    ResponseEntity<UserDto> update(@RequestBody UserDto user);

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/{id}")
    ResponseEntity<Void> delete(@PathVariable UUID id);

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    ResponseEntity<List<UserDto>> getAll();

}