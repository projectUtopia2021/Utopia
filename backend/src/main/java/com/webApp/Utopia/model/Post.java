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

    @Id
    private String id;


    @NotNull(message = "Post title cannot be empty")
    private String title;

    @NotNull(message = "Post description cannot be empty")
    private String desc;
    //外键
    private User user;
    private List<Comment> comments = new ArrayList<>();

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDesc() {
        return desc;
    }
    public void setDesc(String desc) {
        this.desc = desc;
    }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public List<Comment> getComments() {
        return comments; }
    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
   //time list .etc可以添加
}