import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";

import { ListPageScreen, SingleListEditScreen } from "../screens";
import { COLORS } from "../styles/colors";
const { Navigator, Screen } = createStackNavigator();

export const ListPageStack = ({ route, navigation }) => {
  return (
    <Navigator
      screenOptions={{
        title: `${route.params?.listType || "One Time"} Lists`,

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
      <Screen name="ListPage" component={ListPageScreen} />

      <Screen
        name="SingleListEdit"
        component={SingleListEditScreen}
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
                    isEditMode: true,
                  })
                }
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
