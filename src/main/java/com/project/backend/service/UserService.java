package com.project.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.project.backend.builder.EnderecoBuilder;
import com.project.backend.builder.UserBuilder;
import com.project.backend.builder.UserDtoBuilder;
import com.project.backend.model.dto.UserDto;
import com.project.backend.model.entity.Endereco;
import com.project.backend.model.entity.User;
import com.project.backend.repository.UserRepository;
import com.project.backend.service.UserService;

@Service
public class UserService {

    private UserRepository userRepository;

    private UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDto create(UserDto newUser) {
        Endereco endereco = EnderecoBuilder.buildEndereco(newUser);
        User user = userRepository.save(UserBuilder.buildUser(newUser, endereco));
        return UserDtoBuilder.buildUserDto(user);
    }

    public UserDto update(UserDto user) {
        return userRepository.findById(user.getId())
                .map(existingUser -> create(user))
                .orElseThrow(() -> new RuntimeException("User not found!"));
    }

    public void delete(UUID id) {
        userRepository.findById(id)
                .ifPresentOrElse(
                        existingUser -> userRepository.deleteById(id),
                        () -> {
                            throw new RuntimeException("User not found!");
                        });
    }

    public List<UserDto> getAll() {
        List<User> usersList = userRepository.findAll();
        List<UserDto> usersDtoList = new ArrayList<>();

        usersList.forEach(user -> usersDtoList.add(UserDtoBuilder.buildUserDto(user)));

        return usersDtoList;
    }
}
