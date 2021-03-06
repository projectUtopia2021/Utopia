package com.webApp.Utopia.controller;

import com.webApp.Utopia.model.User;
import com.webApp.Utopia.model.UserDTO;
import com.webApp.Utopia.service.UserService;
import com.webApp.Utopia.utils.JWTUtility;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@Api(value = "User Controller")
@ApiOperation(value = "APIs for User Controller")
public class UserController {
    private final UserService userService;
    private final JWTUtility jwtUtility;

    @Autowired
    public UserController(UserService userService, JWTUtility jwtUtility) {
        this.userService = userService;
        this.jwtUtility = jwtUtility;
    }

    // GET Users
    @RequestMapping(method=RequestMethod.GET,value="/")
    public ResponseEntity getAllUsers()
    {
        List<UserDTO> users = userService.getAllUsers();
        return new ResponseEntity(
                users,
                users.size()>0?HttpStatus.OK:HttpStatus.NOT_FOUND
        );
    }

    // GET Users by name
    @RequestMapping(method=RequestMethod.GET,value="/{name}")
    public ResponseEntity getUserByName(@PathVariable("name") String name)
    {
        try{
            UserDTO user = userService.getUserByName(name);
            return new ResponseEntity(
                user,
                user != null ? HttpStatus.OK:HttpStatus.NOT_FOUND);
        }catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(method = RequestMethod.PATCH, value = "/{name}")
    public ResponseEntity updateUserByName(@PathVariable("name") String name, @RequestBody User user) {
        try {
            user.setName(name);
            UserDTO modifiedUser = userService.updateUserByName(user);
            return new ResponseEntity(modifiedUser, HttpStatus.CREATED);
        } catch (Exception exception) {
            return new ResponseEntity(exception.getMessage(), HttpStatus.BAD_REQUEST);
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

    @RequestMapping(method=RequestMethod.GET, value="/community")
    public ResponseEntity subscribeCommunity(@RequestHeader(value = "Authorization") String authorization) {
        String token = authorization.substring(7);
        String userName = jwtUtility.getUsernameFromToken(token);
        try{
            List<String> communities = userService.getJoinedCommunity(userName);
            return new ResponseEntity(communities, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(method=RequestMethod.POST, value="/community/{communityName}")
    public ResponseEntity subscribeCommunity(@PathVariable("communityName") String communityName, @RequestHeader(value = "Authorization") String authorization) {
        String token = authorization.substring(7);
        String userName = jwtUtility.getUsernameFromToken(token);
        try{
            userService.joinCommunity(userName,communityName);
            return new ResponseEntity("Success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/community/{communityName}")
    public ResponseEntity unSubscribeCommunity(@PathVariable("communityName") String communityName, @RequestHeader(value = "Authorization") String authorization) {
        String token = authorization.substring(7);
        String userName = jwtUtility.getUsernameFromToken(token);
        try{
            userService.unSubscribeCommunity(userName,communityName);
            return new ResponseEntity("Success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
