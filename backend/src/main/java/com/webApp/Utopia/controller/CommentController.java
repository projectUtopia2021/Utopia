package com.webApp.Utopia.controller;

import java.util.List;
import java.util.Optional;
import javax.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.webApp.Utopia.exception.CommentCollectionException;
import com.webApp.Utopia.model.Comment;
import com.webApp.Utopia.repository.CommentRepository;
import com.webApp.Utopia.service.CommentService;

@RestController
@RequestMapping(value = "/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    //Health Check
    @RequestMapping(method=RequestMethod.GET,value="/api/")
    public ResponseEntity checkHealth()
    {
        return new ResponseEntity("Hello!! Spring Boot Application is up and running..",HttpStatus.OK);
    }

    // GET Comments
    @RequestMapping(method=RequestMethod.GET,value="/api/getComments")
    public ResponseEntity getAllComments()
    {
        List<Comment> comments = commentService.getAllComments();
        return new ResponseEntity(
                comments,
                comments.size()>0?HttpStatus.OK:HttpStatus.NOT_FOUND
        );
    }

    // SAVE Comment
    @RequestMapping(method= RequestMethod.POST,value="/api/saveComments")
    public ResponseEntity<String> createComment(@RequestBody Comment comment)
    {
        try{
            commentService.createComment(comment);
            return new ResponseEntity("Successfully added comment " +comment.getTitle(), HttpStatus.OK);
        }
        catch(ConstraintViolationException  e){
            return new ResponseEntity(e.getMessage(),HttpStatus.UNPROCESSABLE_ENTITY);
        }
        catch(CommentCollectionException e)
        {
            return new ResponseEntity(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    // EDIT Comment
    @RequestMapping(method=RequestMethod.PUT,value="/api/updateComment/{id}")
    public ResponseEntity updateCommentById(@PathVariable("id") String id,@RequestBody Comment editedComment)
    {
        try {
            commentService.updateComment(id,editedComment);
            return new ResponseEntity("Updated movie with id "+id+"",HttpStatus.OK);
        }
        catch(ConstraintViolationException e)
        {
            return new ResponseEntity(e.getMessage(),HttpStatus.UNPROCESSABLE_ENTITY);
        }
        catch (CommentCollectionException e) {
            return new ResponseEntity(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }


    // DELETE Comment
    @RequestMapping(method=RequestMethod.DELETE,value="/api/deleteComment/{id}")
    public ResponseEntity deleteCommentById(@PathVariable("id") String id)
    {
        try{
            commentService.deleteCommentById(id);
            return new ResponseEntity("Successfully deleted comment with id "+id,HttpStatus.OK);
        }
        catch (CommentCollectionException e)
        {
            return new ResponseEntity(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

}

