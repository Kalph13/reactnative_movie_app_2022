import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from 'react-native';

import { BLACK, DARK_GREY, LIGHT_GREY, YELLOW, WHITE } from "../colors";

const Screen1 = ({ navigation: { navigate }}) => <TouchableOpacity onPress={() => navigate("Screen2")}><Text>Screen1</Text></TouchableOpacity>;
const Screen2 = ({ navigation: { navigate }}) => <TouchableOpacity onPress={() => navigate("Screen3")}><Text>Screen2</Text></TouchableOpacity>;
const Screen3 = ({ navigation: { navigate }}) => <TouchableOpacity onPress={() => navigate("Tabs", { screen: "Search" })}><Text>Screen3</Text></TouchableOpacity>;

/* Stack (Normal Performance, More Customizable): https://reactnavigation.org/docs/stack-navigator */
/* Native Stack (Better Performance, Less Customizable): https://reactnavigation.org/docs/native-stack-navigator/ */
const NativeStack = createNativeStackNavigator();

/* Navigation Props: https://reactnavigation.org/docs/navigation-prop */
export const Stacks = () => {
    return (
        <NativeStack.Navigator screenOptions={{
            animation: "slide_from_right",
            headerTintColor: YELLOW,
        }}>
            <NativeStack.Screen name="Screen1" component={Screen1} />
            <NativeStack.Screen name="Screen2" component={Screen2} />
            <NativeStack.Screen name="Screen3" component={Screen3} />
        </NativeStack.Navigator>
    );
};
