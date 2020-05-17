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
import { CustomText, CustomBtn } from "../components";
import { addNewList, getListTypes } from "../store/listTypes";

const mapStateToProps = (state) => {
  return { listTypes: getListTypes(state) };
};

export const AddNewListScreen = connect(mapStateToProps, { addNewList })(
  (props) => {
    const [inputValues, setInputValues] = useState({
      name: "",
      sectionId: "",
    });

    const inputChangeHandler = (key, value) => {
      setInputValues((prev) => ({
        ...prev,
        [key]: value,
      }));
    };

    const submitAddNewListForm = () => {
      props.addNewList(inputValues);
      props.navigation.navigate("ListPageStack");
      console.log(props.state);
    };

    return (
      <View style={styles.containerWrapper}>
        <View style={styles.container}>
          <CustomText
            weight="medium"
            style={{ fontSize: 13, color: COLORS.dark, marginVertical: 5 }}
          >
            list name
          </CustomText>
          <TextInput
            onChangeText={(value) => inputChangeHandler("name", value)}
            style={styles.textInput}
          />
          <View style={styles.listTypeWrapper}>
            {props.listTypes.map((item) => (
                <TouchableOpacity
                style={[styles.listTypeTag ]}
                  key={item.id}
                  onPress={() => {
                    inputChangeHandler("sectionId", item.id);
                  }}
                >
                <View
                style={ { opacity: item.id === inputValues.sectionId ? 0.1 : 1 }}
                >

                  <CustomText weight="bold" style={{ fontSize: 12 }}>
                    {item.name}
                  </CustomText>
                </View>
                </TouchableOpacity>
            ))}
          </View>
          <CustomBtn
            onPress={() => submitAddNewListForm()}
            width="large"
            title="CREaTE LIST"
          />
        </View>
      </View>
    );
  }
);

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
  listTypeWrapper: {
    flexDirection: "row",
    marginVertical: 14,
    justifyContent: "space-around",
    width: "95%",
  },
  listTypeTag: {
    backgroundColor: COLORS.lightGrey,
    paddingVertical: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
  },
});
