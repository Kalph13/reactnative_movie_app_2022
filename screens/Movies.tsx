import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, Dimensions, useColorScheme } from 'react-native';
import styled from 'styled-components/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { makeImgPath } from '../utils';

/* Unnecessary When Using Styled Component */
// import { View, Text, TouchableOpacity } from 'react-native';

/* React Native Web Swiper: https://github.com/reactrondev/react-native-web-swiper */
/* Support Web, But Worse Usability for iOS */
// import Swiper from 'react-native-web-swiper';

/* React Native Swiper: https://github.com/leecade/react-native-swiper */
/* Doesn't Support Web, But Better Usability for iOS */
import Swiper from 'react-native-swiper';

/* Blur View: https://docs.expo.dev/versions/latest/sdk/blur-view */
import { BlurView } from 'expo-blur';

/* Styled-components Example */
/* Not Necessary to Import React Native Tags (View, Text, TouchableOpacity, etc.) */
/* const Btn = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.mainBgColor} // How to Use 'Theme'
`;

const Title = styled.Text`
    color: ${props => props.theme.textColor};
    //color: ${props => (props.selected ? "red" : "blue")}; // How to Control Styles Using Styled-components & Props
`; */

const API_KEY = "53003f8485665501746ef9cdb21e5b20";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.mainBgColor};
`;

const Container = styled.ScrollView`
    background-color: ${props => props.theme.mainBgColor};
`;

const View = styled.View`
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

const Poster = styled.Image`
    width: 30%;
    height: 85%;
    border-radius: 5px;
`;

const Title = styled.Text`
    font-size: 16px;
    color: ${props => props.theme.textColorDeemed};
`;

/* How to Inherit Styles */
const Overview = styled(Title)`
    font-size: 12px;
    margin-top: 10px;
`;

const Votes = styled(Overview)`
    margin-top: 5px;
`;

export const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({ navigation: { navigate }}) => {
    const [loading, setLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState([]);
    const isDark = useColorScheme() === "dark";
    
    const getNowPlaying = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`);
        const { results } = await response.json();
        setNowPlaying(results);
        setLoading(false);
    }

    useEffect(() => {
        getNowPlaying();
    }, [])
    
    return loading ? (
        <Loader>
            <ActivityIndicator color="black" size="large" />
        </Loader>
    ) : (
        <Container>
            <Swiper
                horizontal
                loop
                autoplay
                timeout={2.5}
                showsButtons={false}
                showsPagination={false}
                containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
            >
                {nowPlaying.map(movie => 
                    <View key={movie.id} >
                        <BackgroundImage source={{uri: makeImgPath(movie.backdrop_path)}}/>
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
                                <Poster source={{uri: makeImgPath(movie.poster_path)}} />
                                <Column>
                                    <Title>{movie.original_title}</Title>
                                    {movie.vote_average > 0 ? <Votes>★{movie.vote_average}/10</Votes> : null}
                                    <Overview>{movie.overview.slice(0, 80)} ...</Overview>
                                </Column>
                            </Wrapper>
                        </BlurView>
                    </View>
                )}
            </Swiper>
        </Container>
    );
}

/* How to Use 'navigate' Move Across Tabs ↔ Stacks */
/* How to Control Styles Using Styled-components & Props */
/* (
    <Btn onPress={() => navigate("Stacks", { screen: "Screen1" })}>
        <Title selected={true}>Movies</Title>
        <Title selected={false}>Movies</Title>
    </Btn>
); */

/* StyleSheet Example (Replaced by Styled Component) */
// <TouchableOpacity onPress={() => navigate("Stacks", { screen: "Screen1" })} style={styles.btn}>
// <Text style={styles.text}>Movies</Text>
/* const styles = StyleSheet.create({
    btn: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "blue"
    }
}); */