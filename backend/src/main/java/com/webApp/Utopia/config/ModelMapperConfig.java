package com.webApp.Utopia.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.spi.MatchingStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/*
 * @author Jeff
 * @date 7/19/21 1:33 PM
 */
@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper modelMapper () {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setFullTypeMatchingRequired(true);
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD);

        return modelMapper;
    }

}
