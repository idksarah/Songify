package com.music.demo.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.music.demo.Entites.Song;
import com.music.demo.Repositories.SongRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PublicService {
    private final SongRepository songs;

    public List<Song> allSongs(){
        return songs.findAll();
    }
    public void saveSong(Song song){
        songs.save(song);
    }
    public boolean existsByTitleAndArtist(Song song){
        return songs.existsByTitleAndArtist(song.getTitle(), song.getArtist());
    }
}
