import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AddNewListScreen } from "../screens";
import { COLORS } from "../styles/colors";

const { Navigator, Screen } = createStackNavigator();

export const AddNewListStack = () => {
  return (
    <Navigator
      screenOptions={{
        headerTitle: "Add New List",

        headerStyle: {
          height : 90 ,
          backgroundColor: COLORS.red,
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0,
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Screen
        name="AddNewList"
        component={AddNewListScreen}
        options={{
          title: "Add New List",
        }}
      />
    </Navigator>
  );
};
