import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Dimensions, RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import Slide from '../Components/Slide';
import HMedia from '../Components/HMedia';
import VMedia from '../Components/VMedia';

/* React Native Web Swiper: https://github.com/reactrondev/react-native-web-swiper */
/* Support Web, But Worse Usability for iOS */
// import Swiper from 'react-native-web-swiper';

/* React Native Swiper: https://github.com/leecade/react-native-swiper */
/* Doesn't Support Web, But Better Usability for iOS */
import Swiper from 'react-native-swiper';

/* Unnecessary When Using Styled Component */
// import { View, Text, TouchableOpacity } from 'react-native';

/* Styled-components Example */
/* const Btn = styled.TouchableOpacity`
    background-color: ${props => props.theme.mainBgColor} // How to Use 'Theme'
`;

const Title = styled.Text`
    color: ${props => (props.selected ? "red" : "blue")}; // How to Control Styles Using Styled-components & Props
`;

const Votes = styled(Title)` // How to Inherit Styles
    font-size: 12px;
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

const ListContainer = styled.View`
    margin-bottom: 25px;
`;

const ListTitle = styled.Text`
    color: ${props => props.theme.textColor};
    font-size: 18px;
    font-weight: bold;
    margin-left: 25px;
    margin-bottom: 10px;
`;

const ListScrollView = styled.ScrollView`

`;

export const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [trending, setTrending] = useState([]);

    const getNowPlaying = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`);
        const { results } = await response.json();
        setNowPlaying(results);
    };

    const getUpcoming = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`);
        const { results } = await response.json();
        setUpcoming(results);
    };

    const getTrending = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
        const { results } = await response.json();
        setTrending(results);
    };

    /* Wait Until Fetching All APIs */
    const getData = async() => {
        await Promise.all([
            getNowPlaying(),
            getUpcoming(),
            getTrending()
        ]);
        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);
    
    const onRefresh = async () => {
        setRefreshing(true);
        await getData();
        setRefreshing(false);
    };

    return loading ? (
        <Loader>
            <ActivityIndicator color="black" size="large" />
        </Loader>
    ) : (
        <Container
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <Swiper
                horizontal
                loop
                autoplay
                timeout={2.5}
                showsButtons={false}
                showsPagination={false}
                containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4, marginBottom: 25 }}
            >
                {nowPlaying.map(movie => 
                    <Slide
                        key={movie.id}
                        backdropPath={movie.backdrop_path}
                        posterPath={movie.poster_path}
                        originalTitle={movie.original_title}
                        voteAverage={movie.vote_average}
                        overview={movie.overview}
                    />
                )}
            </Swiper>
            <ListContainer>
                <ListTitle>Trending Movies</ListTitle>
                <ListScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: 25 }}
                >
                    {trending.map(movie => 
                        <VMedia 
                            key={movie.id}
                            posterPath={movie.poster_path}
                            originalTitle={movie.original_title}
                            voteAverage={movie.vote_average}
                        />
                    )}
                </ListScrollView>
            </ListContainer>
            <ListContainer>
                <ListTitle>Coming Soon</ListTitle>
                {upcoming.map(movie =>
                    <HMedia
                        key={movie.id}
                        posterPath={movie.poster_path}
                        originalTitle={movie.original_title}
                        releaseDate={movie.release_date}
                        overview={movie.overview}
                    />
                )}
            </ListContainer>
        </Container>
    );
}

/* How to Use 'navigate' Move Across Tabs ↔ Stacks */
/* How to Control Styles Using Styled-components & Props */
/* export const Movies = ({ navigation: { navigate }}) => (
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