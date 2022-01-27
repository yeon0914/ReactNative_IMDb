import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { View, Text, TouchableOpacity } from "react-native";

const ScreenOne = ({ navigation: { navigate } }) => (
    <TouchableOpacity onPress={ ()=>navigate("Two")}>
        <View>
            <Text>go to two</Text>
        </View>
    </TouchableOpacity>
);
const ScreenTwo = ({ navigation: { navigate } }) => (
    <TouchableOpacity onPress={ ()=>navigate("Three")}>
        <View>
            <Text>go to three</Text>
        </View>
    </TouchableOpacity>
);
const ScreenThree = ({ navigation: { navigate } }) => (
    <TouchableOpacity onPress={ ()=>navigate("Tabs", {screen: "Search"})}>
        <View>
            <Text>Go to search</Text>
        </View>
    </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => (
    <NativeStack.Navigator>
        <NativeStack.Screen name="One" component={ScreenOne}></NativeStack.Screen>
        <NativeStack.Screen name="Two" component={ScreenTwo}></NativeStack.Screen>
        <NativeStack.Screen name="Three" component={ScreenThree}></NativeStack.Screen>
    </NativeStack.Navigator>
);

export default Stack;