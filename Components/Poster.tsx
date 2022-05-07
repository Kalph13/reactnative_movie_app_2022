import React from 'react';
import styled from 'styled-components/native';
import { makeImgPath } from '../utils';

const PosterImage = styled.Image`
    width: 100px;
    height: 140px;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.5);
`;

/* Declare Types Using TypeScript */
interface PosterProps {
    posterPath: string;
};

const Poster: React.FC<PosterProps> = ({ posterPath }) => {
    return (
        <PosterImage source={{uri: makeImgPath(posterPath)}} />
    );
};

export default Poster;

