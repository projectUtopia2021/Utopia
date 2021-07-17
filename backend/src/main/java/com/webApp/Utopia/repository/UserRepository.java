package com.webApp.Utopia.repository;


import com.webApp.Utopia.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    @Query("{'name':?0}")
    Optional<User> findByName(String name);
    Optional<User> findByEmail(String emailAddress);
    Long deleteByName(String Name);
    @Query(value = "{'name':?0}", fields = "{'password': 0, 'locked':0, 'enabled': 0}")
    Optional<User> findByNamePartialData(String name);
}
