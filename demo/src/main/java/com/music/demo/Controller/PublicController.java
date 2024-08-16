package com.music.demo.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.music.demo.Entites.Song;
import com.music.demo.Service.PublicService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class PublicController {
    private final PublicService service;

    @GetMapping("/songs")
    public List<Song> songs(){
        return service.allSongs();
    }
    @PostMapping("/new_song")
    public ResponseEntity<Object> newSong(@RequestBody Song song ){
        if(!service.existsByTitleAndArtist(song)){
            service.saveSong(song);
            return ResponseEntity.ok("Your Song was saved");
        }
        return ResponseEntity.badRequest().body("Your song already existed and was not saved");
    }
}
