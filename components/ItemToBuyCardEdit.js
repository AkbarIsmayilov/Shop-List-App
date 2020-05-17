import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { CustomText } from "./CustomText";
import { COLORS } from "../styles/colors";

export const ItemToBuyCardEdit = ({
  item,
  listItemId,
  deleteHandler,
  goEditScreen,
}) => {
  return (
    <View style={[styles.container]}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={goEditScreen}
          style={[
            styles.editIcon,
            { opacity: listItemId === item.id ? 0.5 : 1 },
          ]}
        >
          <MaterialIcons name="edit" size={20} color="white" />
        </TouchableOpacity>
        <CustomText
          style={{ paddingHorizontal: 10, padding: 7 }}
          weight="medium"
        >
          {item.name}
        </CustomText>
      </View>
      <View style={{ flexDirection: "row" }}>
        <CustomText
          style={{ paddingHorizontal: 10, padding: 7 }}
          weight="medium"
        >
          x{item.amount} {item.unitType}
        </CustomText>
        <TouchableOpacity onPress={deleteHandler} style={styles.deleteIcon}>
          <MaterialIcons name="close" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
    borderRadius: 20,
    // padding: 7,
    marginVertical: 5,
    borderColor: COLORS.borderYellow,
    borderWidth: 3,
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
