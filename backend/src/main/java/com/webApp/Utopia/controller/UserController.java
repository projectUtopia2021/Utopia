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
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    // GET Users
    @RequestMapping(method=RequestMethod.GET,value="/")
    public ResponseEntity getAllUsers()
    {
        List<User> comments = userService.getAllUsers();
        return new ResponseEntity(
                comments,
                comments.size()>0?HttpStatus.OK:HttpStatus.NOT_FOUND
        );
    }

    // GET Users by id
    @RequestMapping(method=RequestMethod.GET,value="/{name}")
    public ResponseEntity getUserByName(@PathVariable("name") String name)
    {
        try{
            User user = userService.getUserByName(name);
            return new ResponseEntity(
                user,
                user != null ? HttpStatus.OK:HttpStatus.NOT_FOUND);
        }catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // DELETE User
    @RequestMapping(method=RequestMethod.DELETE,value="/{name}")
    public ResponseEntity deleteUserByName(@PathVariable("name") String name)
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

    @RequestMapping(method=RequestMethod.PUT, value="/password/")
    public ResponseEntity updatePassword(@RequestBody Map<String, Object> inputData) {
        try{
            userService.updateUserPassword(inputData.get("emailAddress").toString(), inputData.get("password").toString());
            return new ResponseEntity("Successfully updated password", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
