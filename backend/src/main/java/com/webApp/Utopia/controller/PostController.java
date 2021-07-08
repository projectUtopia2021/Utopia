package com.webApp.Utopia.controller;

import com.webApp.Utopia.exception.CommunityCollectionException;
import com.webApp.Utopia.exception.PostCollectionException;
import com.webApp.Utopia.model.Post;
import com.webApp.Utopia.service.CommunityService;
import com.webApp.Utopia.service.PostService;
import com.webApp.Utopia.utils.JWTUtility;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.http.protocol.HTTP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import java.util.List;

@RestController
@Api(value = "Post Controller")
@ApiOperation(value = "APIs for Post Controller")
@RequestMapping("/api/community/post")
public class PostController {

    @Autowired
    private PostService postService;
    @Autowired
    private JWTUtility jwtUtility;


    // GET Posts
    @ApiOperation(value = "communityName is required in path variable")
    @RequestMapping(method=RequestMethod.GET,value="/getPostsByCommunity/{communityName}")
    public ResponseEntity getAllPostsByCommunity(@PathVariable String communityName) {
        try {
            List<Post> posts = postService.getAllPostsByCommunityName(communityName);
            return new ResponseEntity(
                    posts,
                    posts.size()>0?HttpStatus.OK:HttpStatus.NOT_FOUND
            );
        } catch (CommunityCollectionException exception) {
            return new ResponseEntity(exception.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @ApiOperation(value = "communityName and postTitle are required in path variables")
    @RequestMapping(method = RequestMethod.GET, value = "/getPostByTitle/{communityName}/{postTitle}")
    public ResponseEntity findPostByTitle(@PathVariable String communityName, @PathVariable String postTitle) {
        try {
            Post post = postService.getPostByTitle(communityName, postTitle);
            return new ResponseEntity(post, HttpStatus.OK);
        } catch (PostCollectionException exception) {
            return new ResponseEntity(exception.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // SAVE Post
    @ApiOperation(value = "Only title, communityName, description, content are required in Post body")
    @RequestMapping(method= RequestMethod.POST,value="/savePost")
    public ResponseEntity<String> createPost(@RequestBody Post post, @RequestHeader(value = "Authorization") String authorization)
    {
        String token = authorization.substring(7);
        String username = jwtUtility.getUsernameFromToken(token);
        try{
            postService.createPost(post, username);
            return new ResponseEntity("Successfully added post " +post.getTitle(), HttpStatus.OK);
        }
        catch(Exception  e){
            return new ResponseEntity(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // EDIT Post
    @RequestMapping(method=RequestMethod.PUT,value="/{id}")
    public ResponseEntity updatePostById(@PathVariable("id") String id,@RequestBody Post editedPost)
    {
        try {
            postService.updatePost(id,editedPost);
            return new ResponseEntity("Updated posts with id "+id+"",HttpStatus.OK);
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
    @RequestMapping(method=RequestMethod.DELETE,value="/{id}")
    public ResponseEntity deletePostById(@PathVariable("id") String id)
    {
        try{
            postService.deletePostById(id);
            return new ResponseEntity("Successfully deleted post with id "+id,HttpStatus.OK);
        }
        catch (PostCollectionException e)
        {
            return new ResponseEntity(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

}

