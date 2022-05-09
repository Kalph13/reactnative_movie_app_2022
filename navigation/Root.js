import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Tabs } from "./Tabs";
import { Stacks } from "./Stacks";
import { MaterialTops } from "./MaterialTops";

/* Not Working Due to Reanimated 2 Problem */
// import { Drawers } from "./Drawers";

const RootStack = createNativeStackNavigator();

/* Combine Tabs and Stacks: Bottom Tabs Will be Hidden When Stack Screens Show Up (Common UI) */
export const Root = () => {
    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="Tabs" component={Tabs} />
            <RootStack.Screen name="Stacks" component={Stacks} />
        </RootStack.Navigator>
    );
};

// <RootStack.Screen name="MaterialTops" component={MaterialTops} />