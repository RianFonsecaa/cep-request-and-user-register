package com.project.backend.exception;

public class UserAlreadyRegistered extends RuntimeException {

    public UserAlreadyRegistered(String cpf) {
        super("There is already a registered user with the CPF: " + cpf);
    }

}
