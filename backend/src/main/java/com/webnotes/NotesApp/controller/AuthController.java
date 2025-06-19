package com.webnotes.NotesApp.controller;

import com.webnotes.NotesApp.dtos.request.user.UserLoginDTO;
import com.webnotes.NotesApp.models.User;
import com.webnotes.NotesApp.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@Valid @RequestBody UserLoginDTO dto) {
        User user = userRepository.findByName(dto.getName())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (!user.getPassword().equals(dto.getPassword())) {
            throw new EntityNotFoundException("Invalid credentials");
        }

        return ResponseEntity.ok(user);
    }
} 