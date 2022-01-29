import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { useColorScheme } from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./navigation/Root";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./styled";
import { QueryClient, QueryClientProvider } from "react-query";

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

const queryClient = new QueryClient();

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);

  const startLoading = async () => {
    //preload
    const fonts = loadFonts([Ionicons.font]);
    await Promise.all([...fonts]);
  };

  const isDark = useColorScheme() === "dark";

  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      ></AppLoading>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
