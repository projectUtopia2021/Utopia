package com.webApp.Utopia.service;

import com.webApp.Utopia.exception.CommentCollectionException;
import com.webApp.Utopia.model.Comment;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class CommentServiceTest {
    @Autowired
    private CommentService commentService;
    @Test
    void getAllComments() {
    }

    @Test
    @Transactional
    void createComment() throws CommentCollectionException {
        //insert a comment that does not exist
        Comment newComment = new Comment("comment1", "jinritoutiao", "Bucks beat Hawks");
        commentService.createComment(newComment);

    }

    @Test
    @Transactional
    void updateComment() {
    }

    @Test
    @Transactional
    void deleteCommentById() {
    }
}