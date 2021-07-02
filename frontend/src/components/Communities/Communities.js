import * as React from 'react';
import { MainContainer } from './CommunitiesStyles.js';
import { useState } from 'react';
import CommunitySideBar from './CommunitySideBar';

export default function Communities(props) {
    const [communities, setCommunities] = useState([]);

    return (
        <>
            <MainContainer>
                <CommunitySideBar/>
            </MainContainer>
        </>
    );
}