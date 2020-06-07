import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { UserSettingsScreen } from "../screens";
import { headerDefaultStyles } from "../styles/headerDefaultStyle";

const { Navigator, Screen } = createStackNavigator();

export const UserSettingsStack = () => {
  return (
    <Navigator screenOptions={{ ...headerDefaultStyles }}>
      <Screen
        name="UserSettings"
        component={UserSettingsScreen}
        options={{ title: "User Settings" }}
      />
    </Navigator>
  );
};
