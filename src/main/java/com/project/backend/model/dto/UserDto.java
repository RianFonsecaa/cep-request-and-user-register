package com.project.backend.model.dto;

import java.time.LocalDate;
import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private UUID id;

    private String nome;

    private String cpf;

    private LocalDate nascimento;

    private String email;

    private String cep;

    private String estado;

    private String cidade;

    private String bairro;

    private String rua;

    private String numero;

    private String complemento;
}
