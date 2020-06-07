import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AddNewListScreen } from "../screens";
import { COLORS } from "../styles/colors";
import { headerDefaultStyles } from "../styles/headerDefaultStyle";
const { Navigator, Screen } = createStackNavigator();

export const AddNewListStack = () => {
  return (
    <Navigator
      screenOptions={{
        ...headerDefaultStyles,
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
