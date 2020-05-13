import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { connect } from "react-redux";

import { COLORS } from "../styles/colors";
import { CustomText, CustomBtn } from "../components";
import { getUserInfo, changeImageURL, changeUsername } from "../store/userInfo";

const mapStateToProps = (state) => {
  return {
    userInfo: getUserInfo(state),
  };
};

export const UserSettingsScreen = connect(mapStateToProps, {
  changeUsername,
  changeImageURL,
})((props) => {
  const [inputValues, setInputValues] = useState({
    username: props.userInfo.username,
    imageURL: props.userInfo.imageURL,
  });

  const inputChangeHandler = (key, value) => {
    setInputValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const submitAddNewListForm = () => {
    props.changeUsername(inputValues.username);
    props.changeImageURL(inputValues.imageURL);
    props.navigation.navigate("ListPageStack");
  };

  return (
    <View style={styles.containerWrapper}>
      <View style={styles.container}>
        <CustomText
          weight="medium"
          style={{ fontSize: 13, color: COLORS.dark, marginVertical: 5 }}
        >
          username
        </CustomText>
        <TextInput
          value={inputValues.username}
          onChangeText={(value) => inputChangeHandler("username", value)}
          style={styles.textInput}
        />
        <CustomText
          weight="medium"
          style={{ fontSize: 13, color: COLORS.dark, marginVertical: 5 }}
        >
          avatar uri
        </CustomText>
        <TextInput
          value={inputValues.imageURL}
          onChangeText={(value) => inputChangeHandler("imageURL", value)}
          style={styles.textInput}
        />
        <CustomBtn
        style={{marginTop : 10}}
          onPress={() => submitAddNewListForm()}
          title="save changes"
          width="large"
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    // justifyContent: "center",
    flex: 1,
  },
  containerWrapper: {
    backgroundColor: COLORS.red,

    flex: 1,
  },
  textInput: {
    backgroundColor: COLORS.lightGrey,
    borderRadius: 50,
    width: "90%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontFamily: "MontserratRegular",
    fontWeight: "500",
    fontSize: 18,
    alignItems: "center",
    textAlign: "center",
  },
});
