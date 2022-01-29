import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from "react-native";
import Detail from "../screens/Detail";

const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
    <NativeStack.Screen name="Detail" component={Detail}></NativeStack.Screen>
  </NativeStack.Navigator>
);

export default Stack;
