package com.music.demo.Repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.music.demo.Entites.Song;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {
    boolean existsByTitleAndArtist(String title, String artist);
}
