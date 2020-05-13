import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UserSettingsScreen } from "../screens";
import { COLORS } from "../styles/colors";

const { Navigator, Screen } = createStackNavigator();

export const UserSettingsStack = () => {
  return (
    <Navigator
      screenOptions={{
        headerTitle: "UserSettings",

        headerStyle: {
          height: 90,
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
        name="UserSettings"
        component={UserSettingsScreen}
        options={{ title: "User Settings" }}
      />
    </Navigator>
  );
};
