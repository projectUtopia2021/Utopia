package com.webApp.Utopia.repository;


import com.webApp.Utopia.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface PostRepository extends MongoRepository<Post, String>{

    @Query("{'title':?0}")
    Optional<Post> findByTitle(String title);

}