package com.project.backend.controller.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.controller.UserController;
import com.project.backend.model.dto.UserDto;
import com.project.backend.service.UserService;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/users")
public class UserControllerImpl implements UserController {

    private UserService userService;

    public UserControllerImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public ResponseEntity<UserDto> create(UserDto newUser) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.create(newUser));
    }

    @Override
    public ResponseEntity<UserDto> update(UserDto user) {
        return ResponseEntity.ok(userService.update(user));
    }

    @Override
    public ResponseEntity<Void> delete(UUID id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<List<UserDto>> getAll() {
        List<UserDto> userDtos = userService.getAll();

        if (userDtos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(userDtos);
    }
}
