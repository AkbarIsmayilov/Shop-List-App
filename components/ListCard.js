import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Text,
} from "react-native";

import { CustomText } from "./CustomText";
import { COLORS } from "../styles/colors";
import { ProgressBar } from "./ProgressBar";

export const ListCard = ({ shopList ,listType  }) => {
  const totalItems = shopList.itemsToBuy.length;
  const boughtItems = shopList.itemsToBuy.filter((item) => item.completed === true ).length;
    
  const isCompleted =( listType === "One Time" && boughtItems/totalItems === 1 );
  const Touchable =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <View style={[styles.shopList , { opacity : isCompleted ? 0.5 : 1 }]}>
      <View style={styles.descriptionWrapper}>
        <View style={styles.headingWrapper}>
          <CustomText weight="bold" style={{ lineHeight: 22, fontSize: 18 }}>
            {shopList.name ? shopList.name : "no name " }
          </CustomText>
          <CustomText weight="bold" style={{ lineHeight: 22, fontSize: 13 }}>
            {boughtItems} / {totalItems}
          </CustomText>
        </View>

        <ProgressBar totalItems={totalItems} boughtItems={boughtItems} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 50,
    backgroundColor: COLORS.red,
    padding: 15,
  },
  shopList: {
    borderColor: COLORS.borderYellow,
    borderWidth: 2,
    borderRadius: 10,
  },
  descriptionWrapper: {
    marginHorizontal: "5%",
    marginTop: 15,
    marginBottom: 13,
  },
  headingWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 13,
  },
});
