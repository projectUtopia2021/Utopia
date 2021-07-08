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
    private String id;
    @NotNull(message = "Post title cannot be empty")
    private String title;
    @NotNull(message = "Post description cannot be empty")
    private String description;
    private String content;
    //外键
    private String creator;
    private List<Comment> comments;
    private String communityName;
    private String date;

   //time list .etc可以添加
}