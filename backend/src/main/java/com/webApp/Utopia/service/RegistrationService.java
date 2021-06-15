package com.webApp.Utopia.service;

import com.webApp.Utopia.model.User;
import com.webApp.Utopia.utils.RegistrationRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class RegistrationService {
    private final UserService userService;
    private final EmailValidator emailValidator;

    public String register(RegistrationRequest request) throws Exception{
        boolean isValidEmail = emailValidator.test(request.getEmail());
        if(!isValidEmail){
            throw new IllegalStateException("Email not valid");
        };

        System.out.println(request.getName());
        return userService.createUser(
                new User(
                    request.getName(),
                    request.getEmail(),
                    request.getPassword()
                )
        );
    }
}
