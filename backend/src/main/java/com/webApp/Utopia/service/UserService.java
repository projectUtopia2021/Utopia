package com.webApp.Utopia.service;

import com.webApp.Utopia.exception.CommentCollectionException;
import com.webApp.Utopia.model.Comment;
import com.webApp.Utopia.model.User;
import com.webApp.Utopia.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    public List<User> getAllUsers() {
        List<User> users = userRepo.findAll();
        if (users.size() > 0) {
            return users;
        } else {
            return new ArrayList<User>();
        }
    }

    public void createUser(User user)
            throws Exception {

        // If the comment is valid as per not null constraint we have to next
        // check if the comment with the same name/id already exists
        Optional<User> userNameOptional = userRepo
                .findByName(user.getName());
        if (userNameOptional.isPresent()) {
            System.out.println(userNameOptional.get());
            throw new IllegalArgumentException("User Name exists");
        } else {
            userRepo.save(user);
        }

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
}
