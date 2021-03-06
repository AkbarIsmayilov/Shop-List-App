import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { connect } from "react-redux";

import { COLORS } from "../styles/colors";
import { CustomText, CustomBtn, RadioGroup, Field } from "../components";
import { addNewList, getListTypes } from "../store/listTypes";
import { LIST_TYPES } from "../utils/dataStorage";

export const AddNewListScreen = connect(null, { addNewList })((props) => {
  const [inputValues, setInputValues] = useState({
    name: "",
    sectionName: "One Time",
    id: "",
  });

  const inputChangeHandler = (key, value) => {
    setInputValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const submitAddNewListForm = async () => {
    const listId = `${Math.random()}${Date.now()}`;
    await props.addNewList({ ...inputValues, listId });

    await props.navigation.navigate("ListPageStack", {
      listId,
      isEditMode: true,
      screen: "SingleListEdit",
      params: {
        listId,
        listType: inputValues.sectionName,
        isEditMode: true,
        title: inputValues.name,
      },
    });
  };

  return (
    <View style={styles.containerWrapper}>
      <View style={styles.container}>
        <Field
          width="90%"
          value={inputValues.name}
          label="list name"
          onValueChange={(value) => inputChangeHandler("name", value)}
        />

        <View style={styles.listTypeWrapper}>
          <RadioGroup
            value={inputValues.sectionName}
            options={LIST_TYPES}
            onValueChange={(value) => inputChangeHandler("sectionName", value)}
          />
        </View>
        <CustomBtn
          onPress={() => submitAddNewListForm()}
          width="large"
          title="CREaTE LIST"
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    paddingVertical: 9,
  },
  containerWrapper: {
    backgroundColor: COLORS.red,
    flex: 1,
  },

  listTypeWrapper: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-around",
  },
});
