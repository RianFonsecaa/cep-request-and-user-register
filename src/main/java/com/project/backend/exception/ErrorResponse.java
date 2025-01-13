package com.project.backend.exception;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorResponse {

    private int statusCode;
    private Date timeStamp;
    private String message;
    private String requestDetails;

}
