import React, { useState } from 'react';
import styled from 'styled-components/native';
import { RefreshControl } from 'react-native';

import Loader from '../Components/Loader';
import { HList } from '../Components/HList';

import { tvAPI } from '../api';
import { useQuery, useQueryClient } from 'react-query';

const ScrollView = styled.ScrollView`
    margin-top: 10px;
`;

export const Tv = () => {

    const queryClient = useQueryClient();
    const [ refreshing, setRefreshing ] = useState(false);

    const {
        isLoading: todayLoading,
        data: todayData,
        // isRefetching: todayIsRefetching
    } = useQuery(["tv", "today"], tvAPI.airingToday);
    
    const {
        isLoading: topLoading,
        data: topData,
        // isRefetching: topIsRefetching
    } = useQuery(["tv", "top"], tvAPI.topRated);
    
    const {
        isLoading: trendingLoading,
        data: trendingData,
        // isRefetching: trendingIsRefetching
    } = useQuery(["tv", "trending"], tvAPI.trending);

    const loading = todayLoading || topLoading || trendingLoading;
    
    /* Replaced by useState Due to Performance Issue (Multiple Rendering from || ) */
    // const refreshing = todayIsRefetching || topIsRefetching || trendingIsRefetching;

    const onRefresh = async () => {
        setRefreshing(true);
        await queryClient.refetchQueries(["tv"]);
        setRefreshing(false);
    };

    return loading ? (
        <Loader /> 
    ) : (
        <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <HList title="Trending TV" data={trendingData.results} />
            <HList title="Airing Today" data={todayData.results} />
            <HList title="Top Rated TV" data={topData.results} />
        </ScrollView>
    );
};