import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";

import Detail from "../screens/Detail";

import { BLACK, DARK_GREY, LIGHT_GREY, YELLOW, WHITE } from "../colors";

/* Stack (Normal Performance, More Customizable): https://reactnavigation.org/docs/stack-navigator */
/* Native Stack (Better Performance, Less Customizable): https://reactnavigation.org/docs/native-stack-navigator/ */
const NativeStack = createNativeStackNavigator();

/* Navigation Props: https://reactnavigation.org/docs/navigation-prop */
export const Stacks = () => {
    const isDark = useColorScheme() === "dark";
    return (
        <NativeStack.Navigator
            screenOptions={{
                animation: "slide_from_right",
                headerTintColor: isDark ? WHITE : BLACK,
                headerStyle: {
                    backgroundColor: isDark ? BLACK : WHITE
                },
                contentStyle: {
                    backgroundColor: isDark ? BLACK : WHITE
                }
            }}
        >
            <NativeStack.Screen name="Detail" component={Detail} />
        </NativeStack.Navigator>
    );
};
