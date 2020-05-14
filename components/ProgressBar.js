import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import { COLORS } from "../styles/colors";

export const ProgressBar = ({ totalItems, boughtItems }) => {
  return (
    <View style={styles.total}>
      <View
        style={[
          styles.completed,
          { width: ` ${(boughtItems / totalItems) * 100}%` },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  total: {
    width: "100%",
    position: "relative",
    height: 20,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 12,
  },
  completed: {
    position: "absolute",
    height: 20,
    backgroundColor: COLORS.yellow,
    borderRadius: 12,
  },
});
