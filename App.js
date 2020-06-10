import React from "react";
import { AppLoading } from "expo";
import { Provider } from "react-redux";
import { AppState, AsyncStorage, Text, View } from "react-native";

import { loadFonts } from "./styles/fonts";
import { RootDrawer } from "./navigation";
import { store } from "./store";

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFontLoaded: false,
    };
  }

  render() {
    if (!this.state.isFontLoaded) {
      return (
        <AppLoading
          startAsync={loadFonts}
          onFinish={() => this.setState({ isFontLoaded: true })}
        />
      );
    }
    return (
      <Provider store={store}>
        <RootDrawer />
      </Provider>
    );
  }
}
