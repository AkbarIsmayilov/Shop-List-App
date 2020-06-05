import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

import { CustomText } from "./CustomText";
import { COLORS } from "../styles/colors";

export const Field = ({
  value,
  width,
  label,
  onValueChange,
  style,
  ...rest
}) => {
  return (
    <View
      {...rest}
      style={{
        justifyContent: "center",
        alignItems: "center",

        width: width || "100%",
      }}
    >
      <CustomText
        weight="medium"
        style={{ fontSize: 13, color: COLORS.dark, marginVertical: 5 }}
      >
        {label}
      </CustomText>
      <TextInput
        value={value}
        onChangeText={(value) => onValueChange(value)}
        style={[styles.textInput, { width: "100%" }]}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    backgroundColor: COLORS.lightGrey,
    borderRadius: 50,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontFamily: "MontserratRegular",
    fontWeight: "500",
    fontSize: 18,
    alignItems: "center",
    textAlign: "center",
  },
});
