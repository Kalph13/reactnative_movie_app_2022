import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";

import { Movies } from "../screens/Movies";
import { Search } from "../screens/Search";
import { Tv } from "../screens/Tv";

import { Ionicons } from '@expo/vector-icons';
import { BLACK, DARK_GREY, LIGHT_GREY, YELLOW, WHITE } from "../colors";

/* Bottom Tabs: https://reactnavigation.org/docs/bottom-tab-navigator/*/
const Tab = createBottomTabNavigator();

export const Tabs = () => {
    /* useColorScheme: https://reactnative.dev/docs/usecolorscheme */
    /* Light Mode ↔ Dark Mode w/createBottomTabNavigator */
    const isDark = useColorScheme() === "dark";
    return (
        <Tab.Navigator
            initialRouteName="Movies"
            sceneContainerStyle={{
                backgroundColor: isDark ? BLACK : WHITE /* Control Background Color of All Descendant Screens */
            }}
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: isDark ? BLACK : WHITE
                },
                tabBarActiveTintColor: isDark ? YELLOW : BLACK,
                tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY,
                tabBarLabelStyle: {
                    marginTop: -5,
                    fontSize: 12
                },
                headerStyle: {
                    backgroundColor: isDark ? BLACK : WHITE
                },
                headerTitleStyle: {
                    color: isDark ? WHITE : BLACK,
                }
            }}
        >
            <Tab.Screen name="Movies" component={Movies} options={{
                tabBarIcon: ({color, size}) => <Ionicons name="film" size={size} color={color} />
            }}/>
            <Tab.Screen name="TV" component={Search} options={{
                tabBarIcon: ({color, size}) => <Ionicons name="tv" size={size} color={color} />
            }}/>
            <Tab.Screen name="Search" component={Tv} options={{
                tabBarIcon: ({focused, color, size}) => <Ionicons name={focused ? "search" : "search-outline"} size={size} color={color} />
            }}/>
        </Tab.Navigator>
    );
};