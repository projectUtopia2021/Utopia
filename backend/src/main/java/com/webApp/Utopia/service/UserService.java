package com.webApp.Utopia.service;

import com.webApp.Utopia.exception.CommunityCollectionException;
import com.webApp.Utopia.model.CommunityIdName;
import com.webApp.Utopia.model.Post;
import com.webApp.Utopia.model.User;
import com.webApp.Utopia.model.UserDTO;
import com.webApp.Utopia.repository.UserRepository;
import com.webApp.Utopia.utils.JWTUtility;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepo;
    private final JWTUtility jwtUtility;
    private final CommunityService communityService;
    private final ModelMapper modelMapper;

    @Autowired
    public UserService(UserRepository userRepo, JWTUtility jwtUtility, CommunityService communityService, ModelMapper modelMapper) {
        this.userRepo = userRepo;
        this.jwtUtility = jwtUtility;
        this.communityService = communityService;
        this.modelMapper = modelMapper;
    }

    public List<UserDTO> getAllUsers() {
        List<User> users = userRepo.findAll();
        if (users.size() > 0) {

            return users.stream().map(user -> modelMapper.map(user, UserDTO.class)).collect(Collectors.toList());
        } else {
            return new ArrayList<>();
        }
    }

    public UserDTO getUserByName(String name) {
        Optional<User> user = userRepo.findByNamePartialData(name);
        if (user.isPresent()) {
            UserDTO userDTO =  modelMapper.map(user.get(), UserDTO.class);
            return userDTO;
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

    public UserDTO updateUserByName(User updatedUser) throws UsernameNotFoundException, CommunityCollectionException {
        Optional<User> targetUserOptional = userRepo.findByName(updatedUser.getUsername());
        if (targetUserOptional.isEmpty()) {
            throw new UsernameNotFoundException(updatedUser.getUsername() + " is not found");
        }
        User targetUser = targetUserOptional.get();
        //check if subscribed communities have been updated
        if (updatedUser.getCommunities() != null) {
            int updatedListSize = updatedUser.getCommunities().size();
            int currentListSize = targetUser.getCommunities().size();
            //subscribing community
            if (updatedListSize > currentListSize)
            {
                String communityId = updatedUser.getCommunities().get(updatedListSize - 1).getCommunityId();
                try {
                    communityService.addUserToCommunity(updatedUser.getUsername(), communityId);
                    //avoid duplicate
                    if (!targetUser.getCommunities().stream().anyMatch(c -> communityId.equals(c.getCommunityId()))) {
                        targetUser.setCommunities(updatedUser.getCommunities());
                    }
                } catch (CommunityCollectionException exception) {
                    throw exception;
                }
            } else {
                Set<String> updatedCommunityIdSet = Set.copyOf(updatedUser.getCommunities().stream().map(communityIdName -> communityIdName.getCommunityId()).collect(Collectors.toList()));

                for(CommunityIdName community: targetUser.getCommunities()) {
                    //find the community to be removed
                    if (!updatedCommunityIdSet.contains(community.getCommunityId())) {
                        try {
                            communityService.deleteUserFromCommunity(updatedUser.getUsername(), community.getCommunityId());
                            targetUser.setCommunities(updatedUser.getCommunities());
                        } catch (CommunityCollectionException exception) {
                            throw exception;
                        }
                    }
                }
            }
        }
        userRepo.save(targetUser);
        return modelMapper.map(targetUser, UserDTO.class);
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
            List<String> posts = user.getPosts();
            if(posts == null) posts = new ArrayList<>();
            if(!posts.contains(post.getId())) {
                posts.add(post.getId());
                user.setPosts(posts);
                userRepo.save(user);
            }
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
