package com.webnotes.NotesApp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.webnotes.NotesApp.models.User;
import com.webnotes.NotesApp.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User postUser(User user){
        return userRepository.save(user);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public void deleteUser(Long id){
        if(!userRepository.existsById(id)){
            throw new EntityNotFoundException("User with id "+id+" not found");
        }
        userRepository.deleteById(id);
    }


    public User updateUser(Long id, User user) {
        if (!userRepository.existsById(id)) {
            throw new EntityNotFoundException("User with id " + id + " not found");
        }
        user.setId(id);
        return userRepository.save(user);
    }


    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User with id " + id + " not found"));
    }

}
