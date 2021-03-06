import React from 'react';
import styled from 'styled-components/native';

import { Movie, TV } from "../api";
import VMedia from '../Components/VMedia';

interface HListProps {
    title: string;
    data: Movie[] | TV[];
    item: any[];
}

const ListTitle = styled.Text`
    color: ${props => props.theme.textColor};
    font-size: 18px;
    font-weight: bold;
    margin-left: 25px;
    margin-bottom: 10px;
`;

const ListFlatView = styled.FlatList`
    margin-bottom: 25px;
`;

const VSeparator = styled.View`
    margin-right: 10px;
`;

const KeyExtractor = item => item.id + "";

const renderVMedia = ({ item }) => (
    <VMedia 
        posterPath={item.poster_path}
        originalTitle={item.original_title ?? item.original_name}
        voteAverage={item.vote_average}
        fullData={item}
    />
);

const HList: React.FC<HListProps> = ({ title, data }) => (
    <>
        <ListTitle>{title}</ListTitle>
        <ListFlatView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 25 }}
            keyExtractor={KeyExtractor}
            ItemSeparatorComponent={VSeparator}
            data={data}
            renderItem={renderVMedia}
        />
    </>
);

export default HList;