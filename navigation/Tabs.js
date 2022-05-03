import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Movies } from "../screens/Movies";
import { Search } from "../screens/Search";
import { Tv } from "../screens/Tv";

const Tab = createBottomTabNavigator();

export const Tabs = () => (
    <Tab.Navigator>
        <Tab.Screen name="Movies" component={Movies} />
        <Tab.Screen name="Tv" component={Search} />
        <Tab.Screen name="Search" component={Tv} />
    </Tab.Navigator>
);