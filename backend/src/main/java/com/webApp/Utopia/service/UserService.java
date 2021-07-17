package com.webApp.Utopia.service;

import com.webApp.Utopia.exception.CommunityCollectionException;
import com.webApp.Utopia.model.CommunityIdName;
import com.webApp.Utopia.model.Post;
import com.webApp.Utopia.model.User;
import com.webApp.Utopia.repository.UserRepository;
import com.webApp.Utopia.utils.JWTUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepo;
    private final JWTUtility jwtUtility;
    private final CommunityService communityService;

    @Autowired
    public UserService(UserRepository userRepo, JWTUtility jwtUtility, CommunityService communityService) {
        this.userRepo = userRepo;
        this.jwtUtility = jwtUtility;
        this.communityService = communityService;
    }

    public List<User> getAllUsers() {
        List<User> users = userRepo.findAll();
        if (users.size() > 0) {
            return users;
        } else {
            return new ArrayList<User>();
        }
    }

    public User getUserByName(String name) {
        Optional<User> user = userRepo.findByNamePartialData(name);
        if (user.isPresent()) {
            return user.get();
        } else {
            return null;
        }
    }

    public String createUser(User user)
            throws Exception {

        // If the comment is valid as per not null constraint we have to next
        // check if the comment with the same name/id already exists
        Optional<User> userNameOptional = userRepo
                .findByName(user.getName());
        if (userNameOptional.isPresent()) {
            System.out.println(userNameOptional.get());
            throw new IllegalArgumentException("User Name exists");
        }
        //String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(user.getPassword());
        user.setCommunities(new ArrayList<>());
        user.setFriends(new ArrayList<>());
        user.setPosts(new ArrayList<>());
        try {
            userRepo.save(user);
        }catch(Exception e){
            throw new IllegalStateException("User creation failed");
        }

        return user.getName();

    }

    public User updateUserByName(User updatedUser) throws UsernameNotFoundException, CommunityCollectionException {
        Optional<User> targetUserOptional = userRepo.findByName(updatedUser.getUsername());
        if (targetUserOptional.isEmpty()) {
            throw new UsernameNotFoundException(updatedUser.getUsername() + " is not found");
        }
        User targetUser = targetUserOptional.get();
        if (updatedUser.getCommunities() != null) {
            int listSize = updatedUser.getCommunities().size();
            if (listSize > 0)
            {
                String communityId = updatedUser.getCommunities().get(listSize - 1).getCommunityId();
                try {
                    communityService.addUserToCommunity(updatedUser.getUsername(), communityId);
                    //avoid duplicate
                    if (!targetUser.getCommunities().stream().anyMatch(c -> communityId.equals(c.getCommunityId()))) {
                        targetUser.setCommunities(updatedUser.getCommunities());
                    }
                } catch (CommunityCollectionException exception) {
                    throw exception;
                }
            }
        }
        userRepo.save(targetUser);
        return targetUser;
    }

    public void deleteUserByName(String name) throws Exception
    {
        Optional<User> userOptional=userRepo.findByName(name);
        if(!userOptional.isPresent())
        {
            throw new IllegalArgumentException("User " + name + "Not Found");
        }
        else
        {
            userRepo.deleteByName(name);
        }
    }

    public void updateUserPassword(String emailAddress, String password){
        Optional<User> userOptional = userRepo.findByEmail(emailAddress);
        if(!userOptional.isPresent()) {
            throw new IllegalArgumentException("User " + emailAddress + "Not Found");
        } else {
            User targetUser = userOptional.get();
            targetUser.setPassword(password);
            userRepo.save(targetUser);
        }
    }

    public boolean addToUserPostsHistory(Post post){
        Optional<User> userOptional = userRepo.findByName(post.getUsername());
        if(userOptional.isPresent()) {
            User user = userOptional.get();
            List<Post> posts = user.getPosts();
            if(posts == null) posts = new ArrayList<Post>();
            posts.add(post);
            user.setPosts(posts);
            posts = user.getPosts();
            userRepo.save(user);
            return true;
        }else{
            return false;
        }
    }

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        //return new User("admin","password", new ArrayList<>());
        return userRepo.findByName(name).orElseThrow(() -> new UsernameNotFoundException("User " + name + " Not Found"));
    }
}
