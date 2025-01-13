package com.project.backend.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.project.backend.builder.EnderecoBuilder;
import com.project.backend.builder.UserBuilder;
import com.project.backend.builder.UserDtoBuilder;
import com.project.backend.exception.UserNotFoundException;
import com.project.backend.model.dto.UserDto;
import com.project.backend.model.entity.Endereco;
import com.project.backend.model.entity.User;
import com.project.backend.repository.UserRepository;
import com.project.backend.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    private UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDto create(UserDto newUser) {
        Endereco endereco = EnderecoBuilder.buildEndereco(newUser);
        User user = userRepository.save(UserBuilder.buildUser(newUser, endereco));
        return UserDtoBuilder.buildUserDto(user);
    }

    @Override
    public UserDto update(UserDto user) {
        userRepository.findById(user.getId()).orElseThrow(() -> new UserNotFoundException(user.getId()));
        return create(user);
    }

    @Override
    public void delete(UUID id) {
        userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        userRepository.deleteById(id);
    }

    @Override
    public List<UserDto> getAll() {
        List<User> usersList = userRepository.findAll();
        List<UserDto> usersDtoList = new ArrayList<>();

        usersList.forEach(user -> usersDtoList.add(UserDtoBuilder.buildUserDto(user)));

        return usersDtoList;
    }
}
