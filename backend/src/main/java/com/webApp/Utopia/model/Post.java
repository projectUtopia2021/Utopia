package com.webApp.Utopia.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.ArrayList;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="post")
public class Post {
    @NotNull(message = "Id cannot be empty")
    private String id;
    @NotNull(message = "Post title cannot be empty")
    private String title;
    @NotNull(message = "Post description cannot be empty")
    private String description;
    @NotNull(message = "Username cannot be empty")
    private String username;
    private String parentId;
    @NotNull(message = "communityId cannot be empty")
    private String communityId;
    private String communityName;
    private List<Post> children;

}