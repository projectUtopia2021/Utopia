package com.webApp.Utopia.service;

import com.webApp.Utopia.exception.CommentCollectionException;
import com.webApp.Utopia.model.Comment;
import com.webApp.Utopia.repository.CommentRepository;
import kotlin.jvm.internal.unsafe.MonitorKt;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class CommentServiceMockitoTest {
    @Mock
    private CommentRepository commentRepository;

    @InjectMocks
    @Autowired
    private CommentService commentService;

    @Test
    void getAllComments() {
        List<Comment> commentList = new ArrayList<Comment>();
        Comment comment1 = new Comment();
        comment1.setId("1");
        comment1.setDesc("this is comment1");
        comment1.setTitle("comment1");

        Comment comment2 = new Comment();
        comment2.setId("2");
        comment2.setDesc("this is comment2");
        comment2.setTitle("comment2");

        commentList.add(comment1);
        commentList.add(comment2);

        //when commentRepository.findAll() method is called, the commentList will be returned
        Mockito.when(commentRepository.findAll()).thenReturn(commentList);

        List<Comment> testList = commentService.getAllComments();
        assertEquals(2, testList.size());
    }

    @Test
    void getAllCommentsWhenEmpty() {
        Mockito.when(commentRepository.findAll()).thenReturn(new ArrayList<Comment>());
        List<Comment> testList = commentService.getAllComments();
        assertEquals(0, testList.size());
    }

    @Test
    void createCommentDoesNotExist() throws CommentCollectionException {
        Mockito.when(commentRepository.findByTitle(Mockito.any())).thenReturn(Optional.empty());
        commentService.createComment(new Comment());
        //if the comment doesn't exist in the database, then commentRepository.save() will be executed exactly once
        Mockito.verify(commentRepository, Mockito.times(1)).save(Mockito.any());
    }

    @Test
    void createCommentExists() throws CommentCollectionException{
        Comment comment1 = new Comment();
        comment1.setId("1");
        comment1.setDesc("this is comment1");
        comment1.setTitle("comment1");
        Mockito.when(commentRepository.findByTitle(Mockito.any())).thenReturn(Optional.of(new Comment()));
        assertThrows(CommentCollectionException.class, () -> commentService.createComment(comment1));
    }

    @Test
    void updateCommentDoesNotExist() throws ConstraintViolationException, CommentCollectionException{
        Mockito.when(commentRepository.findById(Mockito.any())).thenReturn(Optional.empty());
        Mockito.when(commentRepository.findByTitle(Mockito.any())).thenReturn(Optional.empty());
        assertThrows(CommentCollectionException.class, () -> commentService.updateComment("1", new Comment()));
    }

    @Test
    void updateCommentSuccess() throws ConstraintViolationException, CommentCollectionException {
        Comment existingComment = new Comment("1", "Bucks win the title", "Giannis won the FMVP and Suns lost");
        Comment modifiedComment = new Comment("1", "Bucks win the title", "Holiday won the FMVP title");

        Mockito.when(commentRepository.findById("1")).thenReturn(Optional.of(existingComment));
        Mockito.when(commentRepository.findByTitle("Bucks win the title")).thenReturn(Optional.of(existingComment));

        commentService.updateComment("1", modifiedComment);
        Mockito.verify(commentRepository, Mockito.times(1)).save(existingComment);

    }

    @Test
    void deleteCommentByIdDoesNotExist() throws CommentCollectionException{
        Mockito.when(commentRepository.findById("1")).thenReturn(Optional.empty());
        assertThrows(CommentCollectionException.class, ()->commentService.deleteCommentById("1"));
    }
    
    @Test
    void deleteCommentByIdExists() throws CommentCollectionException {
        Mockito.when(commentRepository.findById("1")).thenReturn(Optional.of(new Comment("1", "Bucks", "won the title")));
        commentService.deleteCommentById("1");
        Mockito.verify(commentRepository, Mockito.times(1)).deleteById(Mockito.any());
    }
}