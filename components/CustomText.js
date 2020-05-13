import React from "react";
import { Text } from "react-native";

const fontFamilies = {
  regular: "MontserratRegular",
  medium: "MontserratMedium",
  bold: "MontserratBold",
};

export const CustomText = ({ children, style, weight, ...rest }) => {
  return (
    <Text
      {...rest}
      style={[
        {
          fontFamily: fontFamilies[weight] || fontFamilies.regular,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
