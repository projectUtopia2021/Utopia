package com.webApp.Utopia.controller;
import com.webApp.Utopia.model.JwtRequest;
import com.webApp.Utopia.model.JwtResponse;
import com.webApp.Utopia.service.RegistrationService;
import com.webApp.Utopia.service.UserService;
import com.webApp.Utopia.utils.JWTUtility;
import com.webApp.Utopia.utils.RegistrationRequest;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@Api(value = "Registration Controller")
@ApiOperation(value = "APIs for Registration Controller")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @PostMapping("/api/register")
    public ResponseEntity register(@RequestBody RegistrationRequest request){
        try{
            String name = registrationService.register(request);
            return new ResponseEntity("User " + name + " Created", HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
