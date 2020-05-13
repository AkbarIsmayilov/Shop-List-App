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


export const ProgressBar = ( {totalItems , boughtItems} ) => {
  console.log(boughtItems)
  return (
        <View style={styles.total}>
          <View style={[styles.completed , {width:` ${( boughtItems / totalItems) * 100}%` }]} />
        </View> 
  );
};


const styles = StyleSheet.create({
  total : {
    width : "100%" ,
    position : "relative", 
    height : 20 ,
    backgroundColor : COLORS.lightGrey ,
    borderRadius :12   ,
  },
  completed  : {
    position: "absolute",
    height : 20 ,
    backgroundColor : COLORS.yellow ,
    borderRadius :12   ,
  }
});
