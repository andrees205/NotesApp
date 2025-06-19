package com.webnotes.NotesApp.mappers;

import com.webnotes.NotesApp.dtos.request.category.CategoryRequestDTO;
import com.webnotes.NotesApp.dtos.response.category.CategoryResponseDTO;
import com.webnotes.NotesApp.models.Category;

public class CategoryMapper {
    public static CategoryResponseDTO toResponseDTO(Category category)
    {
        if (category == null) return null;
        return new CategoryResponseDTO(
            category.getId(),
            category.getName(),
            category.getUserId()
        );
    }

    public static Category toEntity(CategoryRequestDTO dto){
        if (dto == null) return null;
        Category nCategory = new Category();
        nCategory.setName(dto.getName());
        nCategory.setUserId(dto.getUserId());
        return nCategory;
    }

}