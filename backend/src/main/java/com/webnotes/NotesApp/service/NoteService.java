package com.webnotes.NotesApp.service;

import org.springframework.stereotype.Service;

import com.webnotes.NotesApp.models.Note;
import com.webnotes.NotesApp.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoteService {
    private final NoteRepository noteRepository;

    public Note postNote(Note note) {
        return noteRepository.save(note);
    }

    public Note getNoteById(Long id) {
        return noteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Note with id " + id + " not found"));
    }

    public void deleteNote(Long id) {
        if (!noteRepository.existsById(id)) {
            throw new EntityNotFoundException("Note with id " + id + " not found");
        }
        noteRepository.deleteById(id);
    }

    public Note updateNote(Long id, Note note) {
        if (!noteRepository.existsById(id)) {
            throw new EntityNotFoundException("Note with id " + id + " not found");
        }
        note.setId(id);
        return noteRepository.save(note);
    }

    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    public List<Note> getNotesByUserId(Long userId) {
        return noteRepository.findAll().stream()
                .filter(note -> note.getUserId().equals(userId))
                .collect(Collectors.toList());
    }

    public List<Note> getNotesByCategoryId(Long categoryId) {
        return noteRepository.findAll().stream()
                .filter(note -> note.getCategoryId().equals(categoryId))
                .collect(Collectors.toList());
    }

    
}
