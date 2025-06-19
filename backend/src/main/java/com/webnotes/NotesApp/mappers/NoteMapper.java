package com.webnotes.NotesApp.mappers;

import com.webnotes.NotesApp.dtos.request.note.NoteRequestDTO;
import com.webnotes.NotesApp.dtos.response.note.NoteResponseDTO;
import com.webnotes.NotesApp.models.Note;

public class NoteMapper {
    public static NoteResponseDTO toResponseDTO(Note note) {
        if (note == null) return null;
        return new NoteResponseDTO(
            note.getId(),
            note.getTitle(),
            note.getContent(),
            note.getCreationDate(),
            note.getUpdateDate(),
            note.getUserId(),
            note.getCategoryId()
        );
    }

   public static Note toEntity(NoteRequestDTO dto) {
       if (dto == null) return null;
       Note note = new Note();
       note.setTitle(dto.getTitle());
       note.setContent(dto.getContent());
       note.setUserId(dto.getUserId());
       note.setCategoryId(dto.getCategoryId());
       return note;
   }
}
