package com.music.demo.Faking;


import com.github.javafaker.Faker;
import com.music.demo.Repositories.SongRepository;
import com.music.demo.Repositories.UserRepository;

import com.music.demo.Entites.Song;

import lombok.RequiredArgsConstructor;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.LinkedList;
import java.util.List;


import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;


@Service
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final SongRepository songRepository;

    private final Faker faker;

    private int numberOfUsers;

    //@PostConstruct
    public void populateDatabaseWithSongs() {
        List<Song> songs = parseSongs();
        for(Song song:songs){
            songRepository.save(song);
        }
    }
    public List<Song> parseSongs(){
        List<Song> songs = new LinkedList<Song>();

        
        String csvFilePath = "/app/csv/ArianaGrande.csv";

        
        try (
            Reader reader = new FileReader(csvFilePath);
            CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader())
        ) {
            int i = 0;
            for (CSVRecord record : csvParser) {
                
                String artist = record.get("Artist");
                String title = record.get("Title");
                String lyrics = record.get("Lyric");

                if(i==1){
                    System.out.println(lyrics);
                }
                Song song = Song.builder()
                .title(title)
                .artist(artist)
                .build();

                songs.add(song);
                ++i;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }


        return songs;
    }
}

