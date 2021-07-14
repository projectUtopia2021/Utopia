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

    public void updateCommunity(Community updatedCommunity) throws CommunityCollectionException{
        Optional<Community> communityByName = communityRepo.findByName(updatedCommunity.getName());
        if (!communityByName.isPresent()) {
            throw new CommunityCollectionException(CommunityCollectionException.NotFoundException(updatedCommunity.getName()));
        } else {
            Community originalCommunity = communityByName.get();
            String id = originalCommunity.getId();
            BeanUtils.copyProperties(updatedCommunity, originalCommunity);
            originalCommunity.setId(id);
            communityRepo.save(originalCommunity);
        }
    }

    public Community getCommunityById(String id) throws CommunityCollectionException {
        Optional<Community> targetCommunity = communityRepo.findById(id);
        if (targetCommunity.isEmpty()) {
            throw new CommunityCollectionException(CommunityCollectionException.NotFoundException(id));
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
}
