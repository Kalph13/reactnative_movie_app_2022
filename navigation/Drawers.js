import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Movies } from "../screens/Movies";
import { Search } from "../screens/Search";
import { Tv } from "../screens/Tv";

/* Drawer: https://reactnavigation.org/docs/drawer-navigator */
/* Reanimated: https://docs.expo.dev/versions/latest/sdk/reanimated/#installation */

/* Not Working Due to Reanimated 2 Problem */
const Drawer = createDrawerNavigator();

export const Drawers = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Movie" component={Movies} />
            <Drawer.Screen name="TV" component={Tv} />
            <Drawer.Screen name="Search" component={Search} />
        </Drawer.Navigator>
    );
}