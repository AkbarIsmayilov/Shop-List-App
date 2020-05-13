import React from "react";
import {Button} from "react-native"
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons  } from '@expo/vector-icons';


import {ListPageScreen}  from "../screens"
import { COLORS } from "../styles/colors";
const { Navigator, Screen } = createStackNavigator();

export const ListPageStack = ({navigation ,route} ) => {
  let currentScreen = "One Time" ;
  if (route.params) {
    currentScreen = route.params.listType ;
    
  }

  return (
    <Navigator 
    screenOptions={{
      
      headerTitle : `${currentScreen} Lists` ,
      
      headerStyle: {
        height : 90 ,
        backgroundColor: COLORS.red,
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0,
      },
      headerTintColor: '#fff',
      headerTitleAlign : "center",
      headerTitleStyle: {
        fontWeight: 'bold',

      },
      headerRight: () => (
            <MaterialIcons
            style={{marginRight : 15 }}
            name="menu"
              onPress={() => navigation.openDrawer()}
              color="#fff"
              size= {30}
            />
          ),
     
      }} >
      <Screen
        name="ListPage"
        component={ () => <ListPageScreen typeOfList = {currentScreen} />}
      />
    </Navigator>
  );
};
