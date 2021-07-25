package com.webApp.Utopia.service;

import com.webApp.Utopia.exception.CommunityCollectionException;
import com.webApp.Utopia.model.Community;
import com.webApp.Utopia.repository.CommunityRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

/*
 * @author Jeff
 * @date 6/29/21 7:57 PM
 */
@Service
public class CommunityService {
    private final CommunityRepository communityRepo;

    @Autowired
    public CommunityService(CommunityRepository communityRepo) {
        this.communityRepo = communityRepo;
    }

    public List<Community> getAllCommunities() {
        return communityRepo.findAll();
    }

    public void createCommunity(Community newCommunity) throws CommunityCollectionException{
        if (newCommunity.getName() == null) {
            throw new CommunityCollectionException(CommunityCollectionException.PropertyMissing("Community name"));
        }
        Optional<Community> communityByName = communityRepo.findByName(newCommunity.getName());

        if (communityByName.isPresent()) {
            throw new CommunityCollectionException(CommunityCollectionException.CommunityNameExists(newCommunity.getName()));
        }
        newCommunity.setId(UUID.randomUUID().toString());
        newCommunity.setSubscribers(new ArrayList<>());
        newCommunity.setPosts(new ArrayList<>());
        communityRepo.save(newCommunity);

    }
    public void addPostToCommunity(String postId, String communityName) throws Exception{
        Community community = getCommunityByName(communityName);
        List<String> posts = community.getPosts();
        posts.add(postId);
        community.setPosts(posts);
        communityRepo.save(community);
    }

    public void updateCommunity(Community updatedCommunity) throws CommunityCollectionException{
        if (updatedCommunity.getId() == null) {
            throw new CommunityCollectionException(CommunityCollectionException.PropertyMissing("community id"));
        }
        Optional<Community> communityOptional = communityRepo.findById(updatedCommunity.getId());
        if (communityOptional.isEmpty()) {
            throw new CommunityCollectionException(CommunityCollectionException.NotFoundException(updatedCommunity.getId()));
        }

        Community originalCommunity = communityOptional.get();
        String id = originalCommunity.getId();
        BeanUtils.copyProperties(updatedCommunity, originalCommunity);
        originalCommunity.setId(id);
        communityRepo.save(originalCommunity);

    }

    public Community getCommunityById(String id) throws CommunityCollectionException {
        Optional<Community> targetCommunity = communityRepo.findById(id);
        if (targetCommunity.isEmpty()) {
            throw new CommunityCollectionException(CommunityCollectionException.NotFoundException(id));
        }
        return targetCommunity.get();
    }

    public Community getCommunityByName(String name) throws CommunityCollectionException {
        Optional<Community> targetCommunity = communityRepo.findByName(name);
        if (targetCommunity.isEmpty()) {
            throw new CommunityCollectionException(CommunityCollectionException.NotFoundException(name));
        }
        return targetCommunity.get();
    }

    public List<Community> findCommunityByNameApproximate(String name) throws CommunityCollectionException{
        List<Community> communities = communityRepo.findByNameLike(name);
        if (communities.size() > 0) {
            return communities;
        } else {
            throw new CommunityCollectionException(CommunityCollectionException.NotFoundException(name));
        }
    }

    public void deleteCommunity(String communityName, String username) throws CommunityCollectionException {
        Optional<Community> targetCommunity = communityRepo.findByName(communityName);
        if (targetCommunity.isPresent()) {
            //check if the creator name is the same as username passed in
            if( targetCommunity.get().getUsername().equals(username)) {
                communityRepo.deleteByName(communityName);
            } else {
                throw new CommunityCollectionException(CommunityCollectionException.CommunityCreatorNameDoesNotMatch(username));
            }
        } else {
            throw new CommunityCollectionException(CommunityCollectionException.NotFoundException(communityName));
        }
    }


    public void addUserToCommunity(String username, String communityId) throws CommunityCollectionException {
        Optional<Community> communityOptional = communityRepo.findById(communityId);
        if (communityOptional.isEmpty()) {
            throw new CommunityCollectionException(CommunityCollectionException.NotFoundException(communityId));
        }
        Community community = communityOptional.get();
        List<String> subscribers = community.getSubscribers();
        //avoid duplicate
        if (!subscribers.stream().anyMatch(subscriber -> subscriber.equals(username))) {
            subscribers.add(username);
        }
        community.setSubscribers(subscribers);
        communityRepo.save(community);
    }

    public void deleteUserFromCommunity(String username, String communityId) throws CommunityCollectionException {
        Optional<Community> communityOptional = communityRepo.findById(communityId);
        if (communityOptional.isEmpty()) {
            throw new CommunityCollectionException(CommunityCollectionException.NotFoundException(communityId));
        }
        Community community = communityOptional.get();
        List<String> subscribers = community.getSubscribers();
        List<String> updatedSubscribers = subscribers.stream().filter(subscriber -> !subscriber.equals(username)).collect(Collectors.toList());
        community.setSubscribers(updatedSubscribers);
        communityRepo.save(community);
    }

}
