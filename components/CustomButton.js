import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import { CustomText } from "./CustomText";
import { COLORS } from "../styles/colors";

const sizes = {
  small: "20%", 
  medium: "47%",
  large: "92%",
};

export const CustomBtn = ({ width, title, onPress, style, ...rest }) => {
  const Touchable =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <TouchableOpacity
      onPress= {onPress}
      style={[
        styles.container,
        style,
        { width: sizes[width] || sizes.medium },
      ]}
    >
        <View {...rest} style={[styles.btn, ]}>
          <CustomText weight="bold" style={styles.title}>
            {title}
          </CustomText>
        </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 50,
    backgroundColor: COLORS.red,
    padding: 12,
  },
  btn: {
    alignItems: "center",
  },
  title: {
    color: "white",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
