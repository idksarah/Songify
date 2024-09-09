package com.music.demo.Entites;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "songs")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;
    private String artist;

    @OneToOne(mappedBy = "song", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private Lyrics lyrics;
    
    /*@Lob
    @Column(columnDefinition = "TEXT")
    private String lyrics;*/
}
