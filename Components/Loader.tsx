import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

const View = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.mainBgColor};
`;

const Loader = () => (
    <View>
        <ActivityIndicator color="black" size="large" />
    </View>
);

export default Loader;
