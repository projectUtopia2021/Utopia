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

/*
 * @author Jeff
 * @date 6/29/21 7:57 PM
 */
@Service
public class CommunityService {
    @Autowired
    CommunityRepository communityRepo;
    @Autowired
    UserService userService;

    public List<Community> getAllCommunities() {
        return communityRepo.findAll();
    }

    public void createCommunity(Community newCommunity) throws CommunityCollectionException{
        Optional<Community> communityByName = communityRepo.findByName(newCommunity.getName());

        if (communityByName.isPresent()) {
            throw new CommunityCollectionException(CommunityCollectionException.CommunityNameExists(newCommunity.getName()));
        } else {
            communityRepo.save(newCommunity);
        }
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

    public List<Community> getCommunityByName(String name) throws CommunityCollectionException {
        Optional<Community> targetCommunity= communityRepo.findByName(name);

        if (!targetCommunity.isPresent()) {
            throw new CommunityCollectionException(CommunityCollectionException.NotFoundException(name));
        } else {
            List<Community> communityList = new ArrayList<Community>();
            communityList.add(targetCommunity.get());
            return communityList;
        }

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
