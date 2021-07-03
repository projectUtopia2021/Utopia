package com.webApp.Utopia.service;

import com.webApp.Utopia.exception.CommentCollectionException;
import com.webApp.Utopia.exception.CommunityCollectionException;
import com.webApp.Utopia.model.Community;
import com.webApp.Utopia.repository.CommunityRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public List<Community> getAllCommunities() {
        return communityRepo.findAll();
    }

    public void createCommunity(Community newCommunity) throws CommunityCollectionException{
        Optional<Community> communityByName = communityRepo.findByName(newCommunity.getName());
        // need to create an Exception class to handle the exiting error
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

    public Community getCommunityByName(String name) throws CommunityCollectionException {
        Optional<Community> targetCommunity= communityRepo.findByName(name);

        if (!targetCommunity.isPresent()) {
            throw new CommunityCollectionException(CommunityCollectionException.NotFoundException(name));
        } else {
            return targetCommunity.get();
        }
    }


    public Community findCommunityByNameApproximate(String name) {
        Optional<Community> communityByName = communityRepo.findByNameLike(name);
        if (communityByName.isPresent()) {
            return communityByName.get();
        } else {
            return null;
        }
    }

    public void deleteCommunity(String communityName) throws CommunityCollectionException {
        Optional<Community> communityByName = communityRepo.findByName(communityName);
        if(communityByName.isPresent()) {
            communityRepo.deleteByName(communityName);
        } else {
            throw new CommunityCollectionException(CommunityCollectionException.NotFoundException(communityName));
        }
    }
}
