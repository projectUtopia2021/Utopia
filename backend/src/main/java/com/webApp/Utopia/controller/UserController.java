package com.webApp.Utopia.controller;

import com.webApp.Utopia.exception.CommentCollectionException;
import com.webApp.Utopia.model.Comment;
import com.webApp.Utopia.model.User;
import com.webApp.Utopia.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    // GET Comments
    @RequestMapping(method=RequestMethod.GET,value="/getUsers")
    public ResponseEntity getAllUsers()
    {
        List<User> comments = userService.getAllUsers();
        return new ResponseEntity(
                comments,
                comments.size()>0?HttpStatus.OK:HttpStatus.NOT_FOUND
        );
    }

    // SAVE Comment
    @RequestMapping(method= RequestMethod.POST,value="/addUser")
    public ResponseEntity<String> createComment(@RequestBody User user)
    {
        try{
            userService.createUser(user);
            return new ResponseEntity("Successfully added user " +user.getName(), HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // DELETE Comment
    @RequestMapping(method=RequestMethod.DELETE,value="/deleteUser/{name}")
    public ResponseEntity deleteCommentById(@PathVariable("name") String name)
    {
        try{
            userService.deleteUserByName(name);
            return new ResponseEntity("Successfully deleted user with name "+ name,HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
