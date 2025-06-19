package com.webnotes.NotesApp.dtos.response.category;

import com.webnotes.NotesApp.dtos.response.category.CategoryResponseDTO;

public class CategoryResponseDTO {
    private Long id;
    private String name;
    private Long userId;

    public CategoryResponseDTO() {}

    public CategoryResponseDTO(Long id, String name, Long userId)
    {
        this.id =id;
        this.name=name;
        this.userId=userId;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() {
        return name;
    }

    public Long getUserId() {
        return userId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
