import React from "react";
import { Dimensions } from 'react-native';
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import Poster from "./Poster";
import Votes from "./Votes";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const HMovie = styled.TouchableOpacity`
    padding: 0px 25px;
    flex-direction: row;
    width: ${SCREEN_WIDTH - 100}px;
`;

const HColumn = styled.View`
    margin-left: 15px;
`;

const Title = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${props => props.theme.textColorDeemed};
`;

const Release = styled.Text`
    margin-top: 5px;    
    font-size: 12px;
    font-weight: bold;
    color: ${props => props.theme.textColorDeemed};
`;

const Overview = styled(Release)`
    font-weight: normal;
`;

interface HMediaProps {
    posterPath: string;
    originalTitle: string;
    overview: string;
    releaseDate?: string;
    voteAverage?: number;
  }

const HMedia: React.FC<HMediaProps> = ({ posterPath, originalTitle, releaseDate, overview, voteAverage }) => {
    const navigation = useNavigation();
    const moveToDetail = () => {
        navigation.navigate("Stacks", { screen: "Detail" });
    };
    return (
        <HMovie onPress={moveToDetail}>
            <Poster posterPath={posterPath} />
            <HColumn>
                <Title>
                    {originalTitle.slice(0, 50)}
                    {originalTitle.length > 50 ? "..." : null}
                </Title>
                {releaseDate ? 
                    <Release>
                        {new Date(releaseDate).toLocaleDateString("en")}
                    </Release> : null
                }
                {voteAverage ?
                    <Votes voteAverage={voteAverage} /> : null
                }
                <Overview>
                    {overview.slice(0, 140)}
                    {overview.length > 140 ? "..." : null}
                </Overview>
            </HColumn>
        </HMovie>
    );
}

export default HMedia;