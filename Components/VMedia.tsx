import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import Poster from "./Poster";
import Votes from "./Votes";

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
}

const VMedia: React.FC<VMediaProps> = ({ posterPath, originalTitle, voteAverage }) => {
    const navigation = useNavigation();
    const moveToDetail = () => {
        navigation.navigate("Stacks", { screen: "Detail" });
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