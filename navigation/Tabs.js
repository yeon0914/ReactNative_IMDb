import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react";
import Movies from "../screens/Movie";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, YELLOW_COLOR } from "../color";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const isDark = useColorScheme() === "dark";

    return (
        <Tab.Navigator
            sceneContainerStyle={{
                backgroundColor: isDark ? BLACK_COLOR: "white",
            }}
            screenOptions={{
            tabBarStyle: {
                backgroundColor: isDark ? BLACK_COLOR : "white",
            },
            tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
            tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY,
            headerStyle: {
                backgroundColor: isDark ? BLACK_COLOR : "white",
            },
            headerTitleStyle: {
                color: isDark ? "white" : BLACK_COLOR,
            },
            tabBarLabelStyle: {
                marginTop: -5,
                fontSize: 12,
                fontWeight: "600",
            }
        }}>
            <Tab.Screen name="Movies" component={Movies} options={{
                tabBarIcon: ({ color, size }) => {
                    return <Ionicons name="film-outline" color={color} size={size}></Ionicons>
                }
            }}></Tab.Screen>
            <Tab.Screen name="Tv" component={Tv} options={{
                tabBarIcon: ({ color, size }) => {
                    return <Ionicons name="tv-outline" color={color} size={size}></Ionicons>
                }
            }}></Tab.Screen>
            <Tab.Screen name="Search" component={Search} options={{
                tabBarIcon: ({color, size }) => {
                    return <Ionicons name="search-outline" color={color} size={size}></Ionicons>
                }
            }}></Tab.Screen>
        </Tab.Navigator>
    );
};

export default Tabs;