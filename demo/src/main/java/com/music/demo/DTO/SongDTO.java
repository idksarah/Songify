package com.music.demo.DTO;

import com.music.demo.Entites.Lyrics;
import com.music.demo.Entites.Song;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SongDTO {
    public Long id;
    public String title;
    public String artist;
    public String lyrics;

    public SongDTO(Song song){
        this.id = song.getId();
        this.title = song.getTitle();
        this.artist = song.getArtist();
        this.lyrics = (song.getLyrics() != null) ? song.getLyrics().getLyricText() : null;
    }
}
