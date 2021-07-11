package com.webApp.Utopia.controller;

import com.webApp.Utopia.exception.PostCollectionException;
import com.webApp.Utopia.model.Post;
import com.webApp.Utopia.service.PostService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import com.webApp.Utopia.utils.JWTUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import java.util.List;

@RestController
@Api(value = "Post Controller")
@ApiOperation(value = "APIs for Post Controller")
@RequestMapping("/api")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private JWTUtility jwtUtility;

    // GET Posts
    @RequestMapping(method=RequestMethod.GET,value="/posts/{id}")
    public ResponseEntity getAllPosts(@PathVariable("id")  String postId)
    {
        List<Post> posts = postService.getAllPosts(postId);
        return new ResponseEntity(
                posts,
                posts.size()>0?HttpStatus.OK:HttpStatus.NOT_FOUND
        );
    }

    // SAVE Post
    @RequestMapping(method= RequestMethod.POST,value="/post")
    public ResponseEntity<String> createPost(@RequestHeader("Authorization") String token, @RequestBody Post post)
    {
        try{
            String username = jwtUtility.getUsernameFromToken(token.substring(7));
            post.setUsername(username);
            postService.createPost(post);
            return new ResponseEntity("Successfully added post " +post.getTitle(), HttpStatus.CREATED);
        }
        catch(Exception  e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    // EDIT Post
    @RequestMapping(method=RequestMethod.PUT,value="/post/{id}")
    public ResponseEntity updatePostById(@PathVariable("id") String id,@RequestBody Post editedPost)
    {
        try {
            postService.updatePost(id,editedPost);
            return new ResponseEntity("Updated posts with id "+id+"",HttpStatus.CREATED);
        }
        catch(ConstraintViolationException e)
        {
            return new ResponseEntity(e.getMessage(),HttpStatus.UNPROCESSABLE_ENTITY);
        }
        catch (PostCollectionException e) {
            return new ResponseEntity(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }


    // DELETE Post
    @RequestMapping(method=RequestMethod.DELETE,value="/post/{id}")
    public ResponseEntity deletePostById(@PathVariable("id") String id)
    {
        try{
            postService.deletePostById(id);
            return new ResponseEntity("Successfully deleted post with id "+id,HttpStatus.NO_CONTENT);
        }
        catch (PostCollectionException e)
        {
            return new ResponseEntity(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

}

