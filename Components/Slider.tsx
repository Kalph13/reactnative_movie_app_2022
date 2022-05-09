import React from "react"
import { Dimensions } from "react-native"

/* React Native Web Swiper: https://github.com/reactrondev/react-native-web-swiper */
/* Support Web, But Worse Usability for iOS */
// import Swiper from 'react-native-web-swiper';

/* React Native Swiper: https://github.com/leecade/react-native-swiper */
/* Doesn't Support Web, But Better Usability for iOS */
import Swiper from 'react-native-swiper';

import Slide from '../Components/Slide';

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Slider = ({ data }) => {
    return (
        <Swiper
            horizontal
            loop
            autoplay
            timeout={2.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4, marginBottom: 25 }}
        >
            {data.map((movie: Movie) => 
                <Slide
                    key={movie.id}
                    backdropPath={movie.backdrop_path || ""}
                    posterPath={movie.poster_path || ""}
                    originalTitle={movie.original_title}
                    voteAverage={movie.vote_average}
                    overview={movie.overview}
                />
            )}
        </Swiper>
    );
}

export default Slider;