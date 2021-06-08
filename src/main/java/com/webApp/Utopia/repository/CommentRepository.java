package com.webApp.Utopia.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.webApp.Utopia.model.Comment;

public interface CommentRepository extends MongoRepository<Comment, String>{

    @Query("{'title':?0}")
    Optional<Comment> findByTitle(String title);

}

