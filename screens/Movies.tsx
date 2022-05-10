import React, { useState, useEffect } from 'react';
import { Dimensions, RefreshControl, FlatList } from 'react-native';
import styled from 'styled-components/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/* React Native Web Swiper: https://github.com/reactrondev/react-native-web-swiper */
/* Support Web, But Worse Usability for iOS */
// import Swiper from 'react-native-web-swiper';

/* React Native Swiper: https://github.com/leecade/react-native-swiper */
/* Doesn't Support Web, But Better Usability for iOS */
import Swiper from 'react-native-swiper';

import Loader from '../Components/Loader';
import Slider from '../Components/Slider';
import Slide from '../Components/Slide';
import HMedia from '../Components/HMedia';
import VMedia from '../Components/VMedia';
import HList from '../Components/HList';

/* React Query: https://react-query.tanstack.com */
import { useQueryClient, useQuery } from 'react-query';
import { Movie, MovieResponse, moviesAPI } from '../api';

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

const ListFlatView = styled.FlatList`
    margin-bottom: 25px;
`;

const KeyExtractor = item => item.id + "";


const HSeparator = styled.View`
    margin-bottom: 10px;
`;

const renderHeaderComponent = (nowPlayingDataResults, trendingDataResults) => (
    <>
        <Slider data={nowPlayingDataResults} />
        <HList title="Trending Movies" data={trendingDataResults} />
        <ListTitle>Coming Soon</ListTitle>
    </>
);

const renderHMedia = ({ item }) => (
    <HMedia
        key={item.id}
        posterPath={item.poster_path}
        originalTitle={item.original_title}
        releaseDate={item.release_date}
        overview={item.overview}
        fullData={item}
    />
);

export const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {

    const queryClient = useQueryClient();
    const [ refreshing, setRefreshing ] = useState(false);

    const { 
        isLoading: nowPlayingLoading,
        data: nowPlayingData,
        // refetch: nowPlayingRefetch,
        // isRefetching: nowPlayingIsRefetching
    } = useQuery<MovieResponse>(["movies", "nowPlaying"] /* Key for Cache (Categorized) */, moviesAPI.getNowPlaying);

    const { 
        isLoading: upcomingLoading,
        data: upcomingData,
        // refetch: upcomingRefetch,
        // isRefetching: upcomingIsRefetching
    } = useQuery<MovieResponse>(["movies", "upcoming"], moviesAPI.getUpcoming);

    const { 
        isLoading: trendingLoading,
        data: trendingData,
        // refetch: trendingRefetch,
        // isRefetching: trendingIsRefetching
    } = useQuery<MovieResponse>(["movies", "trending"], moviesAPI.getTrending);

    const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
    
    /* Replaced by useState Due to Performance Issue (Multiple Rendering from || ) */
    // const refreshing = nowPlayingIsRefetching || upcomingIsRefetching || trendingIsRefetching;
    
    const onRefresh = async () => {
        setRefreshing(true);
        await queryClient.refetchQueries(["movies"]);
        setRefreshing(false);
        /* Replaced by QueryClient and Categorized Keys*/
        // nowPlayingRefetch();
        // upcomingRefetch();
        // trendingRefetch;
    };
    
    /* Replaced by React Query
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

    const getData = async() => { 
        await Promise.all([
            getNowPlaying(),
            getUpcoming(),
            getTrending()
        ]); // Wait Until Fetching All APIs
        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);
    
    const onRefresh = async () => {
        setRefreshing(true);
        await getData();
        setRefreshing(false);
    };  */

    return loading ? (
        <Loader />
    ) : (
        <ListFlatView 
            refreshing={refreshing}
            onRefresh={onRefresh} 
            ListHeaderComponent={renderHeaderComponent(nowPlayingData?.results, trendingData?.results)}
            keyExtractor={KeyExtractor}
            ItemSeparatorComponent={HSeparator}
            data={upcomingData?.results}
            renderItem={renderHMedia}
        />

        /* Replaced by FlatList (Lazy Render, No Map(), Inherits ScrollView)
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
        </Container> */
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