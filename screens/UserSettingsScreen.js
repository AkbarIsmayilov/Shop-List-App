import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { connect } from "react-redux";

import { COLORS } from "../styles/colors";
import { CustomText, CustomBtn, Field } from "../components";
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
        <Field
          width="90%"
          label="username"
          value={inputValues.username}
          onValueChange={(value) => inputChangeHandler("username", value)}
        />
        <Field
          width="90%"
          label="avatar uri"
          value={inputValues.imageURL}
          onValueChange={(value) => inputChangeHandler("imageURL", value)}
        />

        <CustomBtn
          style={{ marginTop: 10 }}
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
    flex: 1,
  },
  containerWrapper: {
    backgroundColor: COLORS.red,

    flex: 1,
  },
});
