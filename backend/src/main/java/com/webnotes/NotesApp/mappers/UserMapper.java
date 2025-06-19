package com.webnotes.NotesApp.mappers;

import com.webnotes.NotesApp.dtos.request.user.UserRegisterDTO;
import com.webnotes.NotesApp.dtos.response.user.UserResponseDTO;
import com.webnotes.NotesApp.models.User;

public class UserMapper {
    public static User toEntity(UserRegisterDTO dto) {
        if (dto == null) return null;
        User user = new User();
        user.setName(dto.getName());
        user.setPassword(dto.getPassword());
        return user;
    }

    public static UserResponseDTO toResponseDTO(User user) {
        if (user == null) return null;
        return new UserResponseDTO(user.getId(), user.getName(), user.getPassword());
    }
}