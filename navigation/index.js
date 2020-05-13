import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { AddNewListStack } from "./AddNewListStack";
import { UserSettingsStack } from "./UserSettingsStack"
import { ListPageStack  } from "./ListPageStack"
import { COLORS } from "../styles/colors";
 
import { DrawerScreen } from  "../screens"

const { Navigator, Screen } = createDrawerNavigator();
export const RootDrawer = () => {
  return (
    <NavigationContainer>
      <Navigator drawerContent={ (props) => <DrawerScreen {...props} /> } >
        <Screen
          name="ListPageStack"
          component={ListPageStack}
          options={{ title: "One Time List" }}
        />
        <Screen
          name="AddNewListStack"
          component={AddNewListStack}
          options={{ title: "Add New List"  }}
        />
        <Screen
          name="UserSettingsStack"
          component={UserSettingsStack}
          options={{ title: "User Settings" }}
        />
      </Navigator>
    </NavigationContainer>
  );
};
