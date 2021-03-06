package com.webApp.Utopia.service;

import javax.validation.ConstraintViolationException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.webApp.Utopia.exception.CommunityCollectionException;
import com.webApp.Utopia.model.Community;
import com.webApp.Utopia.repository.CommunityRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webApp.Utopia.exception.PostCollectionException;  //Exception可以后面再写
import com.webApp.Utopia.model.Post;
import com.webApp.Utopia.repository.PostRepository;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepo;

    @Autowired
    private CommunityService communityService;

    @Autowired
    private UserService userService;

    public List<Post> getAllPosts(String postId) {
        Optional<List<Post>> posts = postRepo.getSubTree(postId);
        if (posts.isPresent()) {
            return posts.get();
        } else {
            return new ArrayList<Post>();
        }
    }

    public Post getPostById(String postId){
        Optional<Post> post = postRepo.findById(postId);
        if (post.isPresent()) {
            return post.get();
        } else {
            return null;
        }
    }

    public List<Post> getPostByName(String name){
        Optional<List<Post>> posts = postRepo.findByPrefix(name);
        if (posts.isPresent()) {
            return posts.get();
        } else {
            return new ArrayList<Post>();
        }
    }

    public List<Post> queryPostsOfTheCommunity(String name) throws Exception {
        Community targetCommunity = communityService.getCommunityByName(name);
        List<String> postIds = targetCommunity.getPosts();
        List<Post> posts = new ArrayList<>();

        for(String postId : postIds){
            Post post = getPostById(postId);
            if(post == null) throw new IllegalStateException("post " + postId + " does not exist");
            posts.add(post);
        }

        return posts;
    }

    @Transactional
    public void createPost(Post post)
            throws Exception{
        if (post.getTitle() == null || "".equals(post.getTitle())) {
            throw new PostCollectionException(PostCollectionException.PropertyMissing("title"));
        }
        if (post.getCommunityName() == null || "".equals(post.getCommunityName())) {
            throw new PostCollectionException(PostCollectionException.PropertyMissing("Community name"));
        }
        if (post.getDescription() == null || "".equals(post.getDescription())) {
            throw new PostCollectionException(PostCollectionException.PropertyMissing("Post description"));
        }
        //validation
        if(getPostById(post.getId()) != null) throw new IllegalStateException("postId existed");

        String parentId = post.getParentId();
        if(parentId != null){
            Post parent = getPostById(parentId);
            if(parent == null) throw new IllegalStateException("parent post: " + parentId + "does not exist");
            if(!parent.getCommunityName().equals(post.getCommunityName())){
                throw new IllegalStateException("Posts are not from the same community");
            }
        }
        // If the post is valid as per not null constraint we have to next
        // check if the post with the same name/id already exists
        postRepo.save(post);
        //only save the root post
        if(parentId == null) communityService.addPostToCommunity(post.getId(), post.getCommunityName());
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


