package com.music.demo.Service;

import org.springframework.data.jpa.domain.Specification;

import com.music.demo.Entites.Song;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class SongSpecifications {

    public static Specification<Song> findByCriteria(Long id, String title, String artist) {
        return (Root<Song> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            Predicate predicate = cb.conjunction(); // Start with a predicate that matches all records

            if (id != null) {
                predicate = cb.and(predicate, cb.equal(root.get("id"), id));
            }
            if (title != null && !title.isEmpty()) {
                predicate = cb.and(predicate, cb.like(root.get("title"), "%" + title + "%"));
            }
            if (artist != null && !artist.isEmpty()) {
                predicate = cb.and(predicate, cb.like(root.get("artist"), "%" + artist + "%"));
            }

            return predicate;
        };
    }
}

