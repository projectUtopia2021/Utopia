package com.webApp.Utopia.controller;

import com.webApp.Utopia.exception.CommunityCollectionException;
import com.webApp.Utopia.model.Community;
import com.webApp.Utopia.service.CommunityService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

/*
 * @author Jeff
 * @date 6/28/21 9:54 PM
 */
@RequestMapping("/api/community")
@RestController
@Api(value = "Community Controller")
@ApiOperation(value = "APIs for community")
public class CommunityController {

    @Autowired
    CommunityService communityService;

    @GetMapping(value = "/getAllCommunities")
    public ResponseEntity getAllCommunities() {
        return new ResponseEntity(communityService.getAllCommunities(), HttpStatus.OK);
    }

    @GetMapping(value = "/getCommunityByName/{name}")
    public ResponseEntity getCommunityByName(@PathVariable("name") String name) {
        //change to "try" and "catch" once Exception is implemented
        try {
            Community community = communityService.getCommunityByName(name);
            return new ResponseEntity(community, HttpStatus.OK);
        } catch (CommunityCollectionException exception) {
            return new ResponseEntity(exception.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(value = "/createCommunity")
    public ResponseEntity createCommunity(@RequestBody Community community) {
        try {
            communityService.createCommunity(community);
            return new ResponseEntity(community.getName() + " has been successfully created", HttpStatus.OK);
        } catch (CommunityCollectionException exception) {
            return new ResponseEntity(exception.getMessage(), HttpStatus.CONFLICT);
        }
    }


    @PostMapping(value = "/updateCommunity")
    public ResponseEntity updateCommunity(@RequestBody Community community) {
        try {
            communityService.updateCommunity(community);
            return new ResponseEntity(community.getName() + " has been successfully updated", HttpStatus.OK);
        } catch (CommunityCollectionException exception) {
            return new ResponseEntity(exception.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = "/deleteCommunityByName/{communityName}")
    public ResponseEntity deleteCommunity(@PathVariable String communityName) {
        try {
            communityService.deleteCommunity(communityName);
            return new ResponseEntity(communityName + " is deleted", HttpStatus.OK);
        } catch (CommunityCollectionException exception) {
            return new ResponseEntity(communityName + " is not found", HttpStatus.NOT_FOUND);
        }
    }
}
