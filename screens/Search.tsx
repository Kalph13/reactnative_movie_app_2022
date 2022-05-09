import React, { useState } from "react";
import styled from "styled-components/native";

const ScrollView = styled.ScrollView``;

const SearchBar = styled.TextInput`
    background-color: ${props => props.theme.searchBarColor};
    padding: 10px 15px;
    border-radius: 15px;
    width: 90%;
    margin: 10px auto;
`;

export const Search = () => {
    const [query, setQuery] = useState("");
    const onChangeText = (text: string) => setQuery(text);
    console.log(query);
    return (
        <ScrollView>
            <SearchBar
                placeholder="Search for Movie or TV Show"
                placeholderTextColor="grey"
                returnKeyType="search"
                onChangeText={onChangeText}
            /> 
        </ScrollView>
    );
};