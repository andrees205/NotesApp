package com.webnotes.NotesApp.controller;

import com.webnotes.NotesApp.dtos.request.user.UserRegisterDTO;
import com.webnotes.NotesApp.dtos.response.user.UserResponseDTO;
import com.webnotes.NotesApp.mappers.UserMapper;
import com.webnotes.NotesApp.models.User;
import com.webnotes.NotesApp.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@Valid @RequestBody UserRegisterDTO dto) {
        User user = UserMapper.toEntity(dto);
        User saved = userService.postUser(user);
        return ResponseEntity.ok(UserMapper.toResponseDTO(saved));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(@PathVariable Long id, @Valid @RequestBody UserRegisterDTO dto) {
        User user = UserMapper.toEntity(dto);
        User updated = userService.updateUser(id, user);
        return ResponseEntity.ok(UserMapper.toResponseDTO(updated));
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        List<UserResponseDTO> response = users.stream()
                .map(UserMapper::toResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(UserMapper.toResponseDTO(user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}