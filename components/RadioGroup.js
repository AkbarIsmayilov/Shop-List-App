import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { CustomText } from "./CustomText";
import { COLORS } from "../styles/colors";
import { COUNT_TYPES } from "../utils/dataStorage";

export const RadioGroup = ({ options, value, onValueChange }) => {
  return (
    <View style={styles.row}>
      {options.map((option) => (
        <TouchableOpacity
          style={[
            {
              width: `${90 / options.length}%`,
            },
          ]}
          key={`${Math.random()}${Date.now()}`}
          onPress={() => {
            onValueChange(option);
          }}
        >
          <View
            style={[
              styles.radioButton,
              {
                opacity: value === option ? 1 : 0.1,
              },
            ]}
          >
            <CustomText weight="bold"> {option} </CustomText>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  radioButton: {
    backgroundColor: COLORS.lightGrey,
    borderRadius: 40,
    paddingVertical: 13,
    alignItems: "center",
  },
});
