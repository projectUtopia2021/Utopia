package com.webApp.Utopia.repository;

import com.webApp.Utopia.model.Post;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.GraphLookupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Optional;

@Repository
public class PostRepositoryImpl {
    private static final long MAX_DEPTH_SUPPORTED = 10000L;

    private final MongoTemplate mongoTemplate;

    public PostRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public Optional<List<Post>> getSubTree(String postId) {
        final Criteria byPostId = new Criteria("_id").is(postId);
        final MatchOperation matchStage = Aggregation.match(byPostId);

        GraphLookupOperation graphLookupOperation = GraphLookupOperation.builder()
                .from("post")
                .startWith("$_id")
                .connectFrom("_id")
                .connectTo("parentId")
                .as("children");

        Aggregation aggregation = Aggregation.newAggregation(matchStage, graphLookupOperation);

        List<Post> results = mongoTemplate.aggregate(aggregation, "post", Post.class).getMappedResults();
        return CollectionUtils.isEmpty(results) ? Optional.empty() : Optional.of(results);
    }

}
