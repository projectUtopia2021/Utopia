package com.webApp.Utopia.controller;
import com.webApp.Utopia.exception.CommentCollectionException;
import com.webApp.Utopia.model.Comment;
import com.webApp.Utopia.model.User;
import com.webApp.Utopia.service.FriendsService;
import com.webApp.Utopia.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/friends")
public class FriendsController {
    @Autowired
    FriendsService friendsService;

    @RequestMapping(method = RequestMethod.POST, value = "/api/addFriend")
    public ResponseEntity<String> addFriend(@RequestBody Map<String, Object> emailMap) {
        try {
            if (friendsService.addFriend(emailMap.get("emailOne").toString(), emailMap.get("emailTwo").toString())) {
                return new ResponseEntity("added successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity("added failed", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity("added failed", HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/api/deleteFriend")
    public ResponseEntity<String> deleteFriend(@RequestBody Map<String, Object> emailMap) {
        try {
            if (friendsService.deleteFriend(emailMap.get("emailOne").toString(), emailMap.get("emailTwo").toString())) {
                return new ResponseEntity("deleted successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity("deleted failed", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity("deleted failed", HttpStatus.NOT_FOUND);
        }
    }
}
