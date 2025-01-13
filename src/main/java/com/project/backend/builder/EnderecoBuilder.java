package com.project.backend.builder;

import com.project.backend.model.dto.UserDto;
import com.project.backend.model.entity.Endereco;

public class EnderecoBuilder {

    public static Endereco buildEndereco(UserDto userDto) {
        return Endereco.builder()
                .cep(userDto.getCep())
                .estado(userDto.getEstado())
                .cidade(userDto.getCidade())
                .bairro(userDto.getBairro())
                .rua(userDto.getRua())
                .numero(userDto.getNumero())
                .complemento(userDto.getComplemento())
                .build();
    }
}
