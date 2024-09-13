package com.music.demo.Service;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.music.demo.Entites.Song;
import com.music.demo.Entites.User;
import com.music.demo.Repositories.SongRepository;
import com.music.demo.Repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PublicService {
    private final SongRepository songs;
    private final UserRepository users;

    public List<Song> allSongs(){
        return songs.findAll();
    }
    public void saveSong(Song song){
        songs.save(song);
    }
    public boolean existsByTitleAndArtist(Song song){
        return songs.existsByTitleAndArtist(song.getTitle(), song.getArtist());
    }

    public List<User> allUsers(){
        return users.findAll();
    }
    public void saveUser(User user){
        users.save(user);
    }
    public boolean existsByUsername(String username){
        return users.existsByUsername(username);
    }
    public User findUserUsername(String username){
        return users.findByUsername(username);
    }
    public boolean existsByEmail(String email){
        return users.existsByEmail(email);
    }
    public User findUserEmail(String email){
        return users.findByEmail(email);
    }
    public List<Song> findSpecifically(Long id, String title, String artist) {
        Specification<Song> spec = SongSpecifications.findByCriteria(id, title, artist);
        return songs.findAll(spec);
    }
}
