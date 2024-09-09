package com.music.demo.Controller;

import java.util.List;
import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.music.demo.DTO.SongDTO;
import com.music.demo.Entites.Song;
import com.music.demo.Entites.User;
import com.music.demo.Service.PublicService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://webapp:7300", allowedHeaders = "*")
public class PublicController {
    private final PublicService service;

    /*@GetMapping("/songs")
    public ResponseEntity<List<SongDTO>> songs() {
        System.out.println("Hello");
        List<Song> songs = service.allSongs();

        if (songs.isEmpty()) {
            return ResponseEntity.noContent().build();  // Return 204 No Content if the list is empty
        }

        List<SongDTO> resSongs = new ArrayList<SongDTO>();
        for(Song song : songs){
            SongDTO dto = new SongDTO(song);
            resSongs.add(dto);
        }
        
        return ResponseEntity.ok(resSongs);  // Return 200 OK with the list of songs
    }*/

    @GetMapping("/song")
    public ResponseEntity<SongDTO> specificSong(@RequestParam(required = false) Long id,
                                                @RequestParam(required = false) String title,
                                                @RequestParam(required = false) String artist) {
        //System.out.println("World");

        List<Song> songs = service.findSpecifically(id,title,artist);
        
        if (songs.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        SongDTO songDTO = new SongDTO(songs.get(0));
        return ResponseEntity.ok(songDTO);
    }



    @PostMapping("/new_song")
    public ResponseEntity<Object> newSong(@RequestBody Song song ){
        if(!service.existsByTitleAndArtist(song)){
            service.saveSong(song);
            return ResponseEntity.ok("Your Song was saved");
        }
        return ResponseEntity.badRequest().body("Your song already existed and was not saved");
    }
    @GetMapping("/users")
    public List<User> users(){
        return service.allUsers();
    }
    @PostMapping("/new_user")
    public ResponseEntity<Object> newUser(@RequestBody User user ){
        if(!service.existsByUsername(user.getUsername())){
            service.saveUser(user);
            return ResponseEntity.ok("Your User was saved");
        }
        return ResponseEntity.badRequest().body("Your username already existed and was not saved");
    }
    @GetMapping("/check-user-name")
    public ResponseEntity<Object> checkUserName(@RequestParam(name = "username") String username, @RequestParam(name = "password") String password){
        if(!service.existsByUsername(username)){
            return ResponseEntity.badRequest().body("No such user");
        }
        User user = service.findUserUsername(username);
        if(!user.getPassword().equals(password)){
            return ResponseEntity.badRequest().body("Wrong password   "+ user.getPassword()+" != "+ password);
        }
        return ResponseEntity.ok("Such user exists");
    }
    @GetMapping("/check-user-email")
    public ResponseEntity<Object> checkUserEmail(@RequestParam(name = "email") String email, @RequestParam(name = "password") String password){
        if(!service.existsByEmail(email)){
            return ResponseEntity.badRequest().body("No such user");
        }
        User user = service.findUserEmail(email);
        if(!user.getPassword().equals(password)){
            return ResponseEntity.badRequest().body("Wrong password "+ user.getPassword()+" != "+ password);
        }
        return ResponseEntity.ok("Such user exists");
    }
}
