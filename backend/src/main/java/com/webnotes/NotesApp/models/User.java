package com.webnotes.NotesApp.models;

import jakarta.persistence.*;



@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name_user", nullable = false, length = 100)
    private String name;

    @Column(name = "password", nullable = false)
    private String password;

    // @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    // private List<Note> notes;

    public User() {}

    public User(String name, String password) {
        this.name = name;
        this.password = password;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // public List<Note> getNotes() {
    //     return notes;
    // }

    // public void setNotes(List<Note> notes) {
    //     this.notes = notes;
    // }
}
