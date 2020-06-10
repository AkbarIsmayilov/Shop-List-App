import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { COLORS } from "../../styles/colors";
import { CustomText } from "../../components";

export const Header = ({ route, onResetShoplist, totalItems, boughtItems }) => {
  return (
    <View style={styles.headerSection}>
      {route.params.currentScreen === "Regular" ? (
        <TouchableOpacity
          onPress={() => onResetShoplist()}
          style={styles.resetBtn}
        >
          <CustomText weight="bold" style={styles.resetBtnText}>
            RESET
          </CustomText>
        </TouchableOpacity>
      ) : null}
      <CustomText>
        {boughtItems} / {totalItems}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",

    paddingHorizontal: "3%",
  },
  resetBtn: {
    backgroundColor: COLORS.red,
    width: "20%",
    paddingVertical: 4,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  resetBtnText: {
    fontSize: 10,
    color: "white",
  },
});
