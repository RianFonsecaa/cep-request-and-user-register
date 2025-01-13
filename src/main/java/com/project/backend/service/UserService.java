package com.project.backend.service;

import java.util.List;
import java.util.UUID;

import com.project.backend.model.dto.UserDto;

public interface UserService {

    UserDto create(UserDto user);

    UserDto update(UserDto user);

    void delete(UUID id);

    List<UserDto> getAll();
}
