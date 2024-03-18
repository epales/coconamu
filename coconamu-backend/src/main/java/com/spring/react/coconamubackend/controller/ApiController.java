package com.spring.react.coconamubackend.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {
    @GetMapping("/api/hello")
    public String getGreeting() {
        return "Hello, Client!";
    }
}
