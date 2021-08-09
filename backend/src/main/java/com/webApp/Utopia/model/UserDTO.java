package com.webApp.Utopia.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

/*
 * @author Jeff
 * @date 7/19/21 1:37 PM
 */
@Getter
@Setter
public class UserDTO {
    private String name;
    private String email;
    private List<String> friends;
    private List<String> communities;
    private List<String> posts;
}
