package com.project.backend.builder;

import java.util.UUID;

import com.project.backend.model.dto.UserDto;
import com.project.backend.model.entity.Endereco;
import com.project.backend.model.entity.User;

public class UserBuilder {

    public static User buildUser(UserDto userDto, Endereco endereco) {
        return User.builder()
                .id(userDto.getId())
                .nome(userDto.getNome())
                .cpf(userDto.getCpf())
                .nascimento(userDto.getNascimento())
                .email(userDto.getEmail())
                .endereco(endereco)
                .build();
    }
}
