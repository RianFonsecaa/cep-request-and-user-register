package com.project.backend.builder;

import com.project.backend.model.dto.UserDto;
import com.project.backend.model.entity.User;

public class UserDtoBuilder {

    public static UserDto buildUserDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .nome(user.getNome())
                .cpf(user.getCpf())
                .nascimento(user.getNascimento())
                .email(user.getEmail())
                .cep(user.getEndereco().getCep())
                .estado(user.getEndereco().getEstado())
                .cidade(user.getEndereco().getCidade())
                .bairro(user.getEndereco().getBairro())
                .rua(user.getEndereco().getRua())
                .numero(user.getEndereco().getNumero())
                .complemento(user.getEndereco().getComplemento())
                .build();
    }

}
