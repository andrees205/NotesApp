package com.webnotes.NotesApp.repository;

import com.webnotes.NotesApp.models.Category;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{
    List<Category> findByUserId(Long userId);
}
