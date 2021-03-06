package com.webApp.Utopia.controller;

import com.webApp.Utopia.exception.CommunityCollectionException;
import com.webApp.Utopia.model.Community;
import com.webApp.Utopia.model.Post;
import com.webApp.Utopia.service.CommunityService;
import com.webApp.Utopia.service.PostService;
import com.webApp.Utopia.utils.JWTUtility;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
 * @author Jeff
 * @date 6/28/21 9:54 PM
 */
@RequestMapping("/api")
@RestController
@Api(value = "Community Controller")
@ApiOperation(value = "APIs for community")
public class CommunityController {

    private final CommunityService communityService;
    private final PostService postService;
    private final JWTUtility jwtUtility;

    @Autowired
    public CommunityController(CommunityService communityService, PostService postService, JWTUtility jwtUtility) {
        this.communityService = communityService;
        this.postService = postService;
        this.jwtUtility = jwtUtility;
    }

    @GetMapping(value = "/communities")
    public ResponseEntity getAllCommunities() {
        return new ResponseEntity(communityService.getAllCommunities(), HttpStatus.OK);
    }

    @GetMapping(value = "/communities/{name}")
    public ResponseEntity getCommunityByName(@PathVariable("name") String name) {
        try {
            List<Community> communityList = communityService.findCommunityByNameApproximate(name);
            return new ResponseEntity(communityList, HttpStatus.OK);
        } catch (CommunityCollectionException exception) {
            return new ResponseEntity(exception.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/community/{id}")
    public ResponseEntity getCommunityById(@PathVariable("id") String id) {
        try {
            Community community = communityService.getCommunityById(id);
            return new ResponseEntity(community, HttpStatus.OK);

        } catch (CommunityCollectionException exception) {
            return new ResponseEntity(exception.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/community/{name}/posts")
    public ResponseEntity getPostsOfTheCommunity(@PathVariable("name") String name) {
        try {
            List<Post> posts = postService.queryPostsOfTheCommunity(name);
            return new ResponseEntity(posts, HttpStatus.OK);

        } catch (Exception exception) {
            return new ResponseEntity(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/community")
    public ResponseEntity createCommunity(@RequestBody Community community, @RequestHeader("Authorization") String authorization) {
        String token = authorization.substring(7);
        String username = jwtUtility.getUsernameFromToken(token);
        try {
            community.setUsername(username);
            communityService.createCommunity(community);
            return new ResponseEntity(community.getName() + " has been successfully created", HttpStatus.CREATED);
        } catch (CommunityCollectionException exception) {
            return new ResponseEntity(exception.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    //Patch method for now, just pass in the fields that need to be updated
    @PatchMapping(value = "/community/{id}")
    public ResponseEntity updateCommunity(@RequestBody Community community, @PathVariable("id") String id) {
        try {
            communityService.updateCommunity(community);
            return new ResponseEntity(community.getName() + " has been successfully updated", HttpStatus.CREATED);
        } catch (CommunityCollectionException exception) {
            return new ResponseEntity(exception.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = "/community/{id}")
    public ResponseEntity deleteCommunity(@PathVariable("id") String id, @RequestHeader(value = "Authorization") String authorization) {
        String token = authorization.substring(7);
        String username = jwtUtility.getUsernameFromToken(token);
        try {
            communityService.deleteCommunity(id, username);
            return new ResponseEntity(id + " is deleted", HttpStatus.NO_CONTENT);
        } catch (CommunityCollectionException exception) {
            return new ResponseEntity(id + " is not found", HttpStatus.NOT_FOUND);
        }
    }
}
