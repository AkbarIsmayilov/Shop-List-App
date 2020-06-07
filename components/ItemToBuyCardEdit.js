import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { CustomText } from "./CustomText";
import { COLORS } from "../styles/colors";

export const ItemToBuyCardEdit = ({
  isEditMode,
  item,
  isOnEdit,
  deleteHandler,
  goEditScreen,
  onLongPress,
}) => {
  return (
    <TouchableOpacity onLongPress={onLongPress} style={[styles.container]}>
      <View style={{ flexDirection: "row" }}>
        {isEditMode && (
          <View style={[styles.editIcon, { opacity: isOnEdit ? 0.1 : 1 }]}>
            <TouchableOpacity
              key={item.id}
              onPress={goEditScreen}
              style={[styles.editIcon]}
            >
              <MaterialIcons
                key={item.id}
                name="edit"
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
        )}
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
        {isEditMode && (
          <TouchableOpacity onPress={deleteHandler} style={styles.deleteIcon}>
            <MaterialIcons name="close" size={20} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
    borderRadius: 20,
    // padding: 7,
    marginVertical: 7,
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
