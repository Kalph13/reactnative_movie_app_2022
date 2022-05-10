import React, { useEffect } from "react";
import styled from "styled-components/native";
import { StyleSheet, Dimensions, useColorScheme, Linking, Share, Platform } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "react-query";
import * as WebBrowser from 'expo-web-browser';

/* How to Use Gradient in React Native: https://docs.expo.dev/versions/latest/sdk/linear-gradient */
import { LinearGradient } from 'expo-linear-gradient';

import Poster from "../Components/Poster";
import Loader from "../Components/Loader";
import { makeImgPath } from "../utils";
import { moviesAPI, tvAPI } from "../api";
import { BLACK, DARK_GREY, LIGHT_GREY, YELLOW, WHITE } from "../colors";
import { Ionicons } from "@expo/vector-icons"

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
    
`;

const Header = styled.View`
    height: ${SCREEN_HEIGHT / 4}px;
    justify-content: flex-end;
    padding: 0px 20px;
`;

const Background = styled.Image`

`;

const Column = styled.View`
    flex-direction: row;
`;

const Title = styled.Text`
    color: ${props => props.theme.textColor};
    font-size: 24px;
    font-weight: bold;
    align-self: flex-end;
    width: 60%;
    margin-left: 15px;
`;

const Data = styled.View`
    padding: 0px 20px;
`;

const Overview = styled.Text`
    color: ${props => props.theme.textColor}
    margin: 20px 0px;
`;

const VideoButton = styled.TouchableOpacity`
    flex-direction: row;
`;

const ShareButton = styled.TouchableOpacity`

`;

const ButtonText = styled.Text`
    color: ${props => props.theme.textColor}
    margin-left: 10px;
    margin-bottom: 10px;
    line-height: 24px;
`;

type RootStackParamList = {
    Detail: { fullData: any[] };
}

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">

const Detail: React.FC<DetailScreenProps> = ({ navigation: { setOptions }, route: { params } }) => {
    const isDark = useColorScheme() === "dark";
    const isMovie = params.original_title ? true : false;
    const isAndroid = Platform.OS === "android";

    const { isLoading, data } = useQuery([isMovie ? "movies" : "tv", params.id], isMovie ? moviesAPI.detail : tvAPI.detail);

    /* Share: https://reactnative.dev/docs/share */
    const shareMedia = async () => {
        await Share.share({
            url: isAndroid? null : (isMovie ? `https://www.imdb.com/title/${data.imdb_id}` : data.homepage),
            message: isAndroid ? (isMovie ? `https://www.imdb.com/title/${data.imdb_id}` : data.homepage) : null,
            title: isAndroid ? (params.original_title ?? params.original_name) : null
        });
    };

    const ShareButtonHeaderRight = () => (
        <ShareButton onPress={shareMedia}>
            <Ionicons name="share-outline" color={isDark ? WHITE : BLACK} size={24} />
        </ShareButton>
    );

    useEffect(() => {
        setOptions({
            title: params.original_title ? "Movie" : "TV Show",
        })
    }, []);

    useEffect(() => {
        data ? setOptions({
            headerRight: () => <ShareButtonHeaderRight />
        }) : null
    }, [data, isDark]);

    /* Linking (Outlink): https://reactnative.dev/docs/linking */
    /* WebBrowser (In-app): https://docs.expo.dev/versions/latest/sdk/webbrowser */
    const openVideo = async (videoID: string) => {
        const baseURL = `https://m.youtube.com/watch?v=${videoID}`;
        // await Linking.openURL(baseURL); 
        await WebBrowser.openBrowserAsync(baseURL);
    };
    
    return (
        <Container>
            <Header>
                <Background style={StyleSheet.absoluteFill} source={{ uri: makeImgPath(params.backdrop_path || "") }}/>
                <LinearGradient colors={["transparent", isDark ? BLACK : WHITE]} style={StyleSheet.absoluteFill} />
                <Column>
                    <Poster posterPath={params.poster_path || null}/>
                    <Title>
                        {params.original_title ?? params.original_name}
                    </Title>
                </Column>
            </Header>
            <Data>
                <Overview>
                    {params.overview}
                </Overview>
                {isLoading ? <Loader /> : null}
                {data?.videos?.results?.map(video => 
                    <VideoButton key={video.key} onPress={() => openVideo(video.key)}>
                        <Ionicons name="logo-youtube" color={isDark ? WHITE : BLACK} size={24} />
                        <ButtonText>{video.name}</ButtonText>
                    </VideoButton>
                )}
            </Data>
        </Container>
    );
};

export default Detail;