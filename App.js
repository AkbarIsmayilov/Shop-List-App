import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppLoading } from "expo";
import { Provider } from "react-redux";

import { loadFonts } from "./styles/fonts";
import { RootDrawer } from "./navigation";
import store from "./store"

export default function App() {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <AppLoading startAsync={loadFonts} onFinish={() => setLoaded(true)} />
    );
  }

  return (
    
    <Provider store={store}>
      <RootDrawer />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
