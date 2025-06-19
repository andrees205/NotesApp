package com.webnotes.NotesApp.controller;

import com.webnotes.NotesApp.dtos.request.note.NoteRequestDTO;
import com.webnotes.NotesApp.dtos.response.note.NoteResponseDTO;
import com.webnotes.NotesApp.mappers.NoteMapper;
import com.webnotes.NotesApp.models.Note;
import com.webnotes.NotesApp.service.NoteService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }
    
    @PostMapping
    public ResponseEntity<NoteResponseDTO> createNote(@Valid @RequestBody NoteRequestDTO dto) {
        Note note = NoteMapper.toEntity(dto);
        Note saved = noteService.postNote(note);
        return ResponseEntity.ok(NoteMapper.toResponseDTO(saved));
    }

    @GetMapping
    public ResponseEntity<List<NoteResponseDTO>> getAllNotes() {
        List<Note> notes = noteService.getAllNotes();
        List<NoteResponseDTO> response = notes.stream()
                .map(NoteMapper::toResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoteResponseDTO> getNoteById(@PathVariable Long id) {
        Note note = noteService.getNoteById(id);
        return ResponseEntity.ok(NoteMapper.toResponseDTO(note));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<NoteResponseDTO> updateNote(@PathVariable Long id, @Valid @RequestBody NoteRequestDTO dto) {
        Note note = NoteMapper.toEntity(dto);
        Note updated = noteService.updateNote(id, note);
        return ResponseEntity.ok(NoteMapper.toResponseDTO(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }
}