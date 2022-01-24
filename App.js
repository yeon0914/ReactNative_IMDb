import React,{useState} from 'react';
import AppLoading from 'expo-app-loading';
import { Text, Image } from 'react-native';
import * as Font from "expo-font"
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from "expo-asset";
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/Tabs';

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
  
export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  
  const startLoading = async () => {
    //preload
    const fonts = loadFonts([Ionicons.font]);
    await Promise.all([...fonts]);;
  };
  
  if (!ready)
    return (
      <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.error} >
      </AppLoading>
    );
  
  return (
    <NavigationContainer>
      <Tabs></Tabs>
    </NavigationContainer>
  );
}