package com.webApp.Utopia.controller;

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
        Community community = communityService.getCommunityByName(name);
        if (community == null) {
            return new ResponseEntity("not found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity(community, HttpStatus.OK);
    }

    @PostMapping(value = "createCommunity")
    public ResponseEntity createCommunity(@RequestBody Community community) {
        boolean created = communityService.createCommunity(community);
        if (created) {
            return new ResponseEntity("created successfully", HttpStatus.OK);
        }

        return new ResponseEntity(community.getName() + " exists", HttpStatus.CONFLICT);
    }


    @PostMapping(value = "updateCommuity")
    public ResponseEntity updateCommunity(@RequestBody Community community) {
        boolean updated = communityService.updateCommunity(community);
        if (updated) {
            return new ResponseEntity("updated successfully", HttpStatus.OK);
        }

        return new ResponseEntity(community.getName() + " not found", HttpStatus.NOT_FOUND);
    }
}
