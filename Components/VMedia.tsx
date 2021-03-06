import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import Poster from "./Poster";
import Votes from "./Votes";
import { Movie } from "../api";

const VMovie = styled.TouchableOpacity`

`;

const Title = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${props => props.theme.textColorDeemed};
`;

interface VMediaProps {
    posterPath: string;
    originalTitle: string;
    voteAverage: number;
    fullData: Movie;
}

const VMedia: React.FC<VMediaProps> = ({ posterPath, originalTitle, voteAverage, fullData }) => {
    const navigation = useNavigation();
    const moveToDetail = () => {
        navigation.navigate("Stacks", {
            screen: "Detail",
            params: {
                ...fullData
            }
        });
    };
    return (
        <VMovie onPress={moveToDetail}>
            <Poster posterPath={posterPath} />
            <Title>
                {originalTitle.slice(0, 10)}
                {originalTitle.length > 10 ? "..." : null}
            </Title>
            <Votes voteAverage={voteAverage} />
        </VMovie>
    );
};

export default VMedia;