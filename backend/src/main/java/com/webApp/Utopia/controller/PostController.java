package com.webApp.Utopia.controller;

import com.webApp.Utopia.exception.PostCollectionException;
import com.webApp.Utopia.model.Post;
import com.webApp.Utopia.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import java.util.List;

@RestController
public class PostController {

    @Autowired
    private PostService postService;

    // GET Posts
    @RequestMapping(method=RequestMethod.GET,value="/getPosts")
    public ResponseEntity getAllPosts()
    {
        List<Post> posts = postService.getAllPosts();
        return new ResponseEntity(
                posts,
                posts.size()>0?HttpStatus.OK:HttpStatus.NOT_FOUND
        );
    }

    // SAVE Post
    @RequestMapping(method= RequestMethod.POST,value="/savePosts")
    public ResponseEntity<String> createPost(@RequestBody Post post)
    {
        try{
            postService.createPost(post);
            return new ResponseEntity("Successfully added post " +post.getTitle(), HttpStatus.OK);
        }
        catch(ConstraintViolationException  e){
            return new ResponseEntity(e.getMessage(),HttpStatus.UNPROCESSABLE_ENTITY);
        }
        catch(PostCollectionException e)
        {
            return new ResponseEntity(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    // EDIT Post
    @RequestMapping(method=RequestMethod.PUT,value="/updatePost/{id}")
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
    @RequestMapping(method=RequestMethod.DELETE,value="/deletePost/{id}")
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

