package com.project.backend.exception;

import java.util.UUID;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(UUID id) {
        super("There is no registered user related to the ID: " + id);
    }
}
