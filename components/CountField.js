import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";

import { CustomText } from "./CustomText";
import { COLORS } from "../styles/colors";

export const CountField = ({ amountbyProp, onValueChange }) => {
  const amountChangeHandler = (byValue) => {
    if (!isNaN(byValue) && byValue > 0) {
      onValueChange(+byValue);
    } else {
      console.log("error eroeorj---------");
    }
  };

  const decrease = () => amountChangeHandler(+amountbyProp - 1);
  const increase = () => amountChangeHandler(+amountbyProp + 1);

  return (
    <View>
      <CustomText weight="medium" style={styles.label}>
        amount
      </CustomText>
      <View style={styles.amountInput}>
        <TouchableOpacity onPress={decrease}>
          <CustomText weight="bold" style={{ fontSize: 18 }}>
            -
          </CustomText>
        </TouchableOpacity>
        <TextInput
          onChangeText={(value) => amountChangeHandler(+value)}
          value={amountbyProp.toString()}
          keyboardType="numeric"
          style={styles.amountTextInput}
        />
        <TouchableOpacity onPress={increase}>
          <CustomText weight="bold" style={{ fontSize: 18 }}>
            +
          </CustomText>
        </TouchableOpacity>
      </View>
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
  label: {
    fontSize: 13,
    color: COLORS.dark,
    marginVertical: 5,
    textAlign: "center",
  },
  amountInput: {
    backgroundColor: COLORS.lightGrey,
    borderRadius: 50,
    paddingHorizontal: 13,
    paddingVertical: 8,

    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "row",
  },
  amountTextInput: {
    fontFamily: "MontserratRegular",
    fontWeight: "500",
    fontSize: 18,
    alignItems: "center",
    textAlign: "center",
    backgroundColor: COLORS.lightGrey,
  },
});
