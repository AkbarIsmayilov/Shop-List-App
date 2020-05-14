import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";

import {
  ListPageScreen,
  SingleListStaticScreen,
  SingleListEditScreen,
} from "../screens";
import { COLORS } from "../styles/colors";
const { Navigator, Screen } = createStackNavigator();

export const ListPageStack = ({ route, navigation }) => {
  let currentScreen = "One Time";
  if (route.params) {
    currentScreen = route.params.listType;
  }

  return (
    <Navigator
      screenOptions={{
        title: `${currentScreen} Lists`,

        headerStyle: {
          height: 90,
          backgroundColor: COLORS.red,
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0,
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "MontserratMedium",
          fontSize: 16,
        },
        headerRight: () => {
          return (
            <MaterialIcons
              style={{ marginRight: 15 }}
              name="menu"
              onPress={() => navigation.openDrawer()}
              color="#fff"
              size={35}
            />
          );
        },
      }}
    >
      <Screen
        name="ListPage"
        component={() => (
          <ListPageScreen navigation={navigation} typeOfList={currentScreen} />
        )}
      />
      <Screen
        name="SingleListStatic"
        component={SingleListStaticScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerTitleStyle: { fontSize: 18, fontFamily: "MontserratBold" },
          headerRight: () => {
            return (
              <MaterialIcons
                style={{ marginRight: 15 }}
                name="edit"
                onPress={() =>
                  navigation.navigate("SingleListEdit", {
                    title: route.params.title,
                    sectionId: route.params.sectionId,
                    listId: route.params.listId,
                  })
                }
                color="#fff"
                size={30}
              />
            );
          },
        })}
      />
      <Screen
        name="SingleListEdit"
        component={SingleListEditScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerTitleStyle: { fontSize: 18, fontFamily: "MontserratBold" },
          headerRight: () => {
            return (
              <MaterialIcons
                style={ { marginRight: 15 }}
                name="save"
                onPress={() => navigation.openDrawer()}
                color="#fff"
                size={30}
              />
            );
          },
        })}
      />
    </Navigator>
  );
};
