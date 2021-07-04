package com.webApp.Utopia.repository;

import com.webApp.Utopia.model.Comment;
import com.webApp.Utopia.model.Community;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CommunityRepository extends MongoRepository<Community, String> {

    @Query("{'name':?0}")
    Optional<Community> findByName(String name);
    @Query("{'name': {'$regex': '?0', '$options': 'i'}}")
    List<Community> findByNameLike(String name);
    void deleteByName(String name);
}