package com.webApp.Utopia.service;

import com.webApp.Utopia.model.User;
import com.webApp.Utopia.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FriendsService {
    @Autowired
    UserRepository userRepository;

    //add user2 to user1's friendList. This is a One way operation; it does not delete user1 from user2' friendList
    public boolean addFriend(String userEmailOne, String userEmailTwo) {
        Optional<User> userOneOptional = userRepository.findByEmail(userEmailOne);
        Optional<User> userTwoOptional = userRepository.findByEmail(userEmailTwo);

        //one of the users or both users do not exist
        if(!userOneOptional.isPresent() || !userTwoOptional.isPresent()) {
            return false;
        }
        User userOne = userOneOptional.get();
        List<String> userOneFriends = userOne.getFriends();

        userOneFriends.add(userEmailTwo);
        userOne.setFriends(userOneFriends);
        userRepository.save(userOne);

        return true;

    }

    //delete user2 from user1's friendList. This is a One way operation; it does not delete user1 from user2' friendList
    public boolean deleteFriend(String userOneEmail, String userTwoEmail) {
        Optional<User> userOneOptional = userRepository.findByEmail(userOneEmail);
        Optional<User> userTwoOptional = userRepository.findByEmail(userTwoEmail);

        //one of the users or both users do not exist
        if(!userOneOptional.isPresent() || !userTwoOptional.isPresent()) {
            return false;
        }
        User userOne = userOneOptional.get();
        List<String> userOneFriends = userOne.getFriends();

        List<String> newFriendsList = userOneFriends.stream().filter(email -> !email.equals(userTwoEmail)).collect(Collectors.toList());
        userOne.setFriends(newFriendsList);
        userRepository.save(userOne);

        return true;
    }
}
