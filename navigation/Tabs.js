import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react";
import Movies from "../screens/Movie";
import Tv from "../screens/Tv";
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

const Tabs = () => (
    <Tab.Navigator>
        <Tab.Screen name="Movies" component={Movies}></Tab.Screen>
        <Tab.Screen name="Tv" component={Tv}></Tab.Screen>
        <Tab.Screen name="Search" component={Search}></Tab.Screen>
    </Tab.Navigator>
);

export default Tabs;