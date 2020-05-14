import React, { useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  
} from "react-native";

import { CustomText } from "./CustomText";
import { COLORS } from "../styles/colors";

export const ItemToBuyCard = ({ item, onPress }) => {
  
  return (
    <TouchableOpacity
      onLongPress = {onPress}
      style={[styles.container]}
    >
      
      <CustomText weight="medium">{item.name}</CustomText>
      <CustomText weight="medium">
        
        x{item.amount}  {item.unitType}
      </CustomText>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
    borderRadius: 20,
    padding: 7,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderColor: COLORS.borderYellow,
    borderWidth: 3,
  },
});
