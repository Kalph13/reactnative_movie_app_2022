import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screens/Detail";

import { YELLOW } from "../colors";

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
            <NativeStack.Screen name="Detail" component={Detail} />
        </NativeStack.Navigator>
    );
};
