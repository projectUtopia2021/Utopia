package com.webApp.Utopia.repository;


import com.webApp.Utopia.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends MongoRepository<Post, String>{

    Optional<Post> findByTitle(String title);

    @Query(value = "{'communityName': ?0, 'title': ?1}")
    Optional<Post> findByCommunityNameAndTitle(String communityName, String title);
}