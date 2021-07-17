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
<<<<<<< HEAD
    private String id;

=======
    @NotNull(message = "Id cannot be empty")
    private String id;
>>>>>>> 598a67f5963969d89ad4c2d48c0950829ae23543
    @NotNull(message = "Post title cannot be empty")
    private String title;
    @NotNull(message = "Post description cannot be empty")
<<<<<<< HEAD
    private String desc;

=======
    private String description;
    @NotNull(message = "Username cannot be empty")
>>>>>>> 598a67f5963969d89ad4c2d48c0950829ae23543
    private String username;
    @NotNull(message = "Topic Id cannot be empty")
    private String topicId;
    private String parentId;
<<<<<<< HEAD

=======
    @NotNull(message = "communityId cannot be empty")
    private String communityId;
    private String communityName;
>>>>>>> 598a67f5963969d89ad4c2d48c0950829ae23543
    private List<Post> children;

}