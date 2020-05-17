import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { CustomText } from "./CustomText";
import { COLORS } from "../styles/colors";

export const EditItemToBuyForm = ({ item }) => {
  return (
    <View style={[styles.container]}>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // overflow: "hidden",
    // borderRadius: 20,
    // marginVertical: 5,
  },
  editIcon: {
    backgroundColor: COLORS.yellow,
    borderRadius: 20,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteIcon: {
    backgroundColor: COLORS.red,
    borderRadius: 20,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
});
