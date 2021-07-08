package com.webApp.Utopia.service;

import javax.validation.ConstraintViolationException;

import java.util.*;

import com.webApp.Utopia.exception.CommunityCollectionException;
import com.webApp.Utopia.model.Community;
import com.webApp.Utopia.repository.CommunityRepository;
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
    @Autowired
    private CommunityRepository communityRepo;
    @Autowired
    private UserService userService;

    public List<Post> getAllPostsByCommunityName(String communityName) throws CommunityCollectionException{
        Optional<Community> communityOptional = communityRepo.findByName(communityName);
        if (!communityOptional.isPresent()) {
            throw new CommunityCollectionException(CommunityCollectionException.NotFoundException(communityName));
        }

        List<Post> posts = communityOptional.get().getPosts();
        if (posts.size() > 0) {
            return posts;
        } else {
            return new ArrayList<>();
        }
    }

    public Post getPostByTitle(String communityName, String postTitle) throws PostCollectionException {
        Optional<Post> postOptional = postRepo.findByCommunityNameAndTitle(communityName, postTitle);
        if(postOptional.isEmpty()) {
            throw new PostCollectionException(PostCollectionException.NotFoundException(postTitle));
        }

        return postOptional.get();
    }

    public void createPost(Post post, String username) throws PostCollectionException, CommunityCollectionException {
            if (post.getTitle() == null || "".equals(post.getTitle())) {
                throw new PostCollectionException(PostCollectionException.PropertyMissing("title"));
            }
            if (post.getCommunityName() == null || "".equals(post.getCommunityName())) {
                throw new PostCollectionException(PostCollectionException.PropertyMissing("Community name"));
            }
            if (post.getDescription() == null || "".equals(post.getDescription())) {
                throw new PostCollectionException(PostCollectionException.PropertyMissing("Post description"));
            }
            if (post.getContent() == null || "".equals(post.getContent())) {
                throw new PostCollectionException(PostCollectionException.PropertyMissing("Post content"));
            }

            Optional<Community> communityOptional = communityRepo.findByName(post.getCommunityName());

            //check if community exists
            if (communityOptional.isEmpty()) {
                throw new CommunityCollectionException(CommunityCollectionException.NotFoundException(post.getCommunityName()));
            }

            Community community = communityOptional.get();
            List<Post> posts = community.getPosts();

            //check if the post title exists in its community
            if (posts.stream().anyMatch(p -> p.getTitle().equals(post.getTitle()))) {
                throw new PostCollectionException(PostCollectionException.TitleAlreadyExists());
            }

            //fill in the rest of the fields
            post.setId(UUID.randomUUID().toString());
            post.setDate(new Date().toString());
            post.setComments(new ArrayList<>());
            post.setCreator(username);

            //add post to this community
            posts.add(post);
            community.setPosts(posts);

            //save post into Post and Community documents
            postRepo.save(post);
            communityRepo.save(community);
            userService.addToUserPostsHistory(post);
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


