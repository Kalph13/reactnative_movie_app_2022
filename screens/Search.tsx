import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";

import Loader from "../Components/Loader";
import HList from "../Components/HList";
import { moviesAPI, tvAPI } from "../api";

const ScrollView = styled.ScrollView``;

const SearchBar = styled.TextInput`
    background-color: ${props => props.theme.searchBarColor};
    padding: 10px 15px;
    border-radius: 15px;
    width: 90%;
    margin: 10px auto;
    margin-bottom: 20px;
`;

export const Search = () => {
    const [query, setQuery] = useState("");

    /* How to Send Parameters to React Query → ["searchMovies", query] */
    /* Deactivate useQuery() at First → {enabled: false} */
    const {
        isLoading: isLoadingMovies, 
        data: dataMovies,
        refetch: searchMovies
    } = useQuery(["searchMovies", query], moviesAPI.search, {enabled: false});

    const {
        isLoading: isLoadingTv, 
        data: dataTv,
        refetch: searchTv
    } = useQuery(["searchTv", query], tvAPI.search, {enabled: false});

    const onChangeText = (text: string) => {
        setQuery(text);
    }

    /* Activate useQuery() Only When the 'Enter' is Clicked */
    const onSubmit = () => {
        (query === "") ? null : 
            searchMovies();
            searchTv();
    };

    const isLoading = isLoadingMovies || isLoadingTv;
    
    return (
        <ScrollView>
            <SearchBar
                placeholder="Search for Movie or TV Show"
                placeholderTextColor="grey"
                returnKeyType="search"
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
            />
            {isLoading ? <Loader /> : null}
            {dataMovies ? <HList title="Movies" data={dataMovies.results}/> : null}
            {dataTv ? <HList title="TV" data={dataTv.results} /> : null}
        </ScrollView>
    );
};