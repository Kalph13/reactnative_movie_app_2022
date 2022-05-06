import React from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/* Styled-components Example */
/* Not Necessary to Import React Native Tags (View, Text, TouchableOpacity, etc.) */
/* Can Interact with Props Using JSX */
const Btn = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.mainBgColor /* How to Use 'Theme' */}
`;

const Title = styled.Text`
    color: ${props => props.theme.textColor
        /* How to Control Styles Using Styled-components & Props */
        // (props) => (props.selected ? "red" : "blue")
    };
`;

export const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({ navigation: { navigate }}) => (
    /* How to Use 'navigate' Move Across Tabs ↔ Stacks */
    <Btn onPress={() => navigate("Stacks", { screen: "Screen1" })}>
        <Title>Movie</Title>
        {/* How to Control Styles Using Styled-components & Props */
        // <Title selected={true}>Movies</Title>
        // <Title selected={false}>Movies</Title>
        }
    </Btn>
);

/* StyleSheet Example */
// <TouchableOpacity onPress={() => navigate("Stacks", { screen: "Screen1" })} style={styles.btn}>
// <Text style={styles.text}>Movies</Text>
const styles = StyleSheet.create({
    btn: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "blue"
    }
});