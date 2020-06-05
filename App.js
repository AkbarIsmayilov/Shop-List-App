import React from "react";
import { AppLoading } from "expo";
import { Provider } from "react-redux";
import { AppState, AsyncStorage, Text, View } from "react-native";

import { loadFonts } from "./styles/fonts";
import { RootDrawer } from "./navigation";
import store from "./store";

/*export default class App extends React.Component {
  
  constructor(props) {
    super (props) 
    this.state  = {
        loaded : false ,

    }
  }

  componentDidMount
  (){ if (!this.state.loaded) {
    return (
      <AppLoading startAsync={loadFonts} onFinish={() => this.setState({loaded : true})} />
    );
  }}

  componentWillUnmount() {
    return (
      _storeData(store)
    )
  }
  
  render() {
    
    return (
      <Provider store={store}>
        <RootDrawer />
      </Provider>
    );
  }

}

*/

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStoreLoading: false,
      store: store,
      isFontLoaded: false,
    };
  }

  componentDidMount() {
    var self = this;
    AppState.addEventListener("change", this._handleAppStateChange.bind(this));
    this.setState({ isStoreLoading: true });

    AsyncStorage.getItem("completeStore")
      .then((value) => {
        if (value && value.length) {
          let initialStore = JSON.parse(value);
          self.setState({
            store: createStore(reducers, initialStore, middleware),
          });
        } else {
          self.setState({ store: store });
        }
        self.setState({ isStoreLoading: false });
      })
      .catch((error) => {
        self.setState({ store: store });
        self.setState({ isStoreLoading: false });
      });
  }
  _handleAppStateChange(currentAppState) {
    let storingValue = JSON.stringify(this.state.store.getState());
    AsyncStorage.setItem("completeStore", storingValue);
  }
  componentWillUnmount() {
    AppState.removeEventListener(
      "change",
      this._handleAppStateChange.bind(this)
    );
  }

  render() {
    if (this.state.isStoreLoading || !this.state.isFontLoaded) {
      return (
        <AppLoading
          startAsync={loadFonts}
          onFinish={() => this.setState({ isFontLoaded: true })}
        >
          <View>
            <Text>...loading .... </Text>
          </View>
        </AppLoading>
      );
    } else {
      return (
        <Provider store={this.state.store}>
          <RootDrawer />
        </Provider>
      );
    }
  }
}
