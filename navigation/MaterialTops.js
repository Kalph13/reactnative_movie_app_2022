import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Movies } from "../screens/Movies";
import { Search } from "../screens/Search";
import { Tv } from "../screens/Tv";

import { Ionicons } from '@expo/vector-icons';

/* Material Top Tabs: https://reactnavigation.org/docs/material-top-tab-navigator*/
const MaterialTopTabs = createMaterialTopTabNavigator();

/* Bottom Tab Enabled Swipe */
export const MaterialTops = () => {
    return (
        <MaterialTopTabs.Navigator tabBarPosition="bottom" screenOptions={{
            tabBarShowIcon: true,
            tabBarIconStyle: {
                height: 25,
                alignItems: "center",
                justifyContent: "center",
                marginTop: -5,
                marginBottom: -5
            },
            tabBarLabelStyle: {
                fontSize: 10,
                marginBottom: -5
            },
            /* Remove Bottom Border */
            tabBarIndicatorStyle: {
                width: 0, height: 0, /* for Android */
                elevation: 0 /* for iOS */
            }
        }}>
            <MaterialTopTabs.Screen name="Movie" component={Movies} options={{
                tabBarIcon: ({color, size}) => <Ionicons name="film" size={25} color={color} />
            }}/>
            <MaterialTopTabs.Screen name="TV" component={Tv} options={{
                tabBarIcon: ({color, size}) => <Ionicons name="tv" size={25} color={color} />
            }}/>
            <MaterialTopTabs.Screen name="Search" component={Search} options={{
                tabBarIcon: ({focused, color, size}) => <Ionicons name={focused ? "search" : "search-outline"} size={25} color={color} />
            }}/>
        </MaterialTopTabs.Navigator>
    );
}