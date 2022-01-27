import React,{useState} from 'react';
import AppLoading from 'expo-app-loading';
import { View, Text, Image, useColorScheme } from 'react-native';
import * as Font from "expo-font"
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from "expo-asset";
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/Tabs';
import Stack from './navigation/Stack';
import Root from './navigation/Root';
import { ThemeProvider } from 'styled-components/native';
import { darkTheme, lightTheme } from './styled';

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
  
export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  
  const startLoading = async () => {
    //preload
    const fonts = loadFonts([Ionicons.font]);
    await Promise.all([...fonts]);;
  };

  const isDark = useColorScheme() === "dark";
  
  if (!ready) {
    return (
      <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.error} >
      </AppLoading>
    );
  }
  
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}