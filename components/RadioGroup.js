import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { CustomText } from "./CustomText";
import { COLORS } from "../styles/colors";

export const RadioGroup = ({ options, value, onValueChange, style }) => {
  return (
    <View style={[style, styles.row]}>
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
                opacity: value === option ? 1 : 0.5,
              },
            ]}
          >
            <CustomText weight={value === option ? "bold" : "regular"}>
              {option}
            </CustomText>
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
  },
  radioButton: {
    backgroundColor: COLORS.lightGrey,
    borderRadius: 20,
    paddingVertical: 11,
    alignItems: "center",
  },
});
