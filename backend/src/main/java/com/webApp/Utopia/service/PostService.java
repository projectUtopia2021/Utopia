package com.webApp.Utopia.service;

import javax.validation.ConstraintViolationException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webApp.Utopia.exception.PostCollectionException;  //Exception可以后面再写
import com.webApp.Utopia.model.Post;
import com.webApp.Utopia.repository.PostRepository;


@Service
public class PostService {

    @Autowired
    private PostRepository postRepo;

    public List<Post> getAllPosts() {
        List<Post> posts = postRepo.findAll();
        if (posts.size() > 0) {
            return posts;
        } else {
            return new ArrayList<Post>();
        }
    }

    public void createPost(Post post)
            throws ConstraintViolationException, PostCollectionException {

        // If the post is valid as per not null constraint we have to next
        // check if the post with the same name/id already exists
        Optional<Post> postTitleOptional = postRepo
                .findByTitle(post.getId());
        if (postTitleOptional.isPresent()) {
            System.out.println(postTitleOptional.get());
            throw new PostCollectionException(
                    PostCollectionException.TitleAlreadyExists());
        } else {
            postRepo.save(post);
        }

    }

    public void updatePost(String id, Post newPost)
            throws ConstraintViolationException, PostCollectionException {
        Optional<Post> postWithId = postRepo.findById(id);
        Optional<Post> postWithSameTitle = postRepo
                .findByTitle(newPost.getTitle());
        if (postWithId.isPresent()) {
            if (postWithSameTitle.isPresent()
                    && !postWithSameTitle.get().getId().equals(id)) {

                throw new PostCollectionException(
                        PostCollectionException.TitleAlreadyExists());
            }
            Post postToUpdate = postWithId.get();
            BeanUtils.copyProperties(newPost, postToUpdate);

            // To make sure that newComment doesn't get added as a new document
            postToUpdate.setId(id);
            postRepo.save(postToUpdate);
        } else {
            throw new PostCollectionException(
                    PostCollectionException.NotFoundException(id));
        }
    }



    public void deletePostById(String id) throws PostCollectionException
    {
        Optional<Post> postOptional=postRepo.findById(id);
        if(!postOptional.isPresent())
        {
            throw new PostCollectionException(PostCollectionException.NotFoundException(id));
        }
        else
        {
            postRepo.deleteById(id);
        }
    }

}


