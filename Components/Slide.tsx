import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet, useColorScheme } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import Poster from './Poster';
import { makeImgPath } from '../utils';

/* Blur View: https://docs.expo.dev/versions/latest/sdk/blur-view */
import { BlurView } from 'expo-blur';

const View = styled.TouchableOpacity`
    flex: 1;
`;

const BackgroundImage = styled.Image`
    width: 100%;
    height: 100%;
    position: absolute;
`;

const Wrapper = styled.View`
    flex-direction: row;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const Column = styled.View`
    width: 45%;
    margin-left: 20px;
`;

const Title = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${props => props.theme.textColorDeemed};
`;

/* How to Inherit Styles */
const Votes = styled(Title)`
    font-size: 12px;
    font-weight: normal;
    margin-top: 5px;
`;

const Overview = styled(Votes)`

`;

/* Declare Types Using TypeScript */
interface SlideProps {
    backdropPath: string;
    posterPath: string;
    originalTitle: string;
    voteAverage: number;
    overview: string;
};

const Slide: React.FC<SlideProps> = ({ backdropPath, posterPath, originalTitle, voteAverage, overview }) => {
    const isDark = useColorScheme() === "dark";
    const navigation = useNavigation();
    const moveToDetail = () => {
        navigation.navigate("Stacks", { screen: "Detail" });
    };
    return (
        <View onPress={moveToDetail}>
            <BackgroundImage source={{uri: makeImgPath(backdropPath)}}/>
            <BlurView
                intensity={100}
                tint={ isDark ? "dark" : "light" }
                style={
                    StyleSheet.absoluteFill
                    /* Replaced by SyleSheet.absoluteFill */
                    /* {    
                        width: "100%",
                        height: "100%",
                        position: "absolute"
                    } */
                }
            >
                <Wrapper>
                    <Poster posterPath={posterPath} />
                    <Column>
                        <Title>{originalTitle}</Title>
                        {voteAverage > 0 ? <Votes>★{voteAverage}/10</Votes> : null}
                        <Overview>
                            {overview.slice(0, 80)}
                            {overview.length > 80 ? "..." : null}
                        </Overview>
                    </Column>
                </Wrapper>
            </BlurView>
        </View>
    );
};

export default Slide;