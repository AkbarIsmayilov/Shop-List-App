import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { connect } from "react-redux";

import { CustomText } from "./CustomText";
import { COLORS } from "../styles/colors";
import { CustomBtn } from "./CustomButton";
import { addItemToBuy, getListTypes,editItemToBuy } from "../store/listTypes";
const mapStateToProps = (state) => {
  return { listTypes: getListTypes(state) };
};

export const AddItemToBuyForm = connect(mapStateToProps, { addItemToBuy ,editItemToBuy })(
  ({ sectionId, listId, listItemId, listTypes, addItemToBuy,editItemToBuy , navigation }) => {
    const findItemToBuy = () => {
      return listTypes
        .filter((listType) => listType.id === sectionId)[0]
        .shopLists.filter((item) => item.id === listId)[0]
        .itemsToBuy.filter((item) => item.id === listItemId)[0];
    };

    var initialState = {
      name: "",
      amount: 1,
      unitType: "",
    };

    if (listItemId) {
      initialState = findItemToBuy();
    }
    const [inputValues, setInputValues] = useState(initialState);

    return (
      <KeyboardAvoidingView>
        <View style={[styles.container]}>
          <View style={styles.inputsWrapper}>
            <View style={styles.headerInputsContainer}>
              <View style={styles.headerInputs}>
                <CustomText
                  weight="medium"
                  style={{
                    fontSize: 13,
                    color: COLORS.dark,
                    marginVertical: 5,
                    textAlign: "center",
                  }}
                >
                  position name
                </CustomText>
                <TextInput
                  value={inputValues.name}
                  onChangeText={(value) => {
                    console.log(inputValues);
                    setInputValues((prev) => ({ ...prev, name: value }));
                  }}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.headerInputsAmountContainer}>
                <CustomText
                  weight="medium"
                  style={{
                    fontSize: 13,
                    color: COLORS.dark,
                    marginVertical: 5,
                    textAlign: "center",
                  }}
                >
                  amount
                </CustomText>
                <View style={styles.amountInput}>
                  <TouchableOpacity
                    onPress={() => {
                      if (inputValues.amount !== 0) {
                        setInputValues((prev) => ({
                          ...prev,
                          amount: --prev.amount,
                        }));
                      }
                    }}
                  >
                    <CustomText weight="bold" style={{ fontSize: 18 }}>
                      -
                    </CustomText>
                  </TouchableOpacity>
                  <TextInput
                    value={String(inputValues.amount)}
                    onChangeText={(value) => {
                      if (value < 0) {
                        setInputValues((prev) => ({ ...prev, amount: 0 }));
                      } else {
                        setInputValues((prev) => ({ ...prev, amount: +value }));
                        console.log(inputValues.amount);
                      }
                    }}
                    keyboardType="numeric"
                    style={styles.amountTextInput}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      setInputValues((prev) => ({
                        ...prev,
                        amount: ++prev.amount,
                      }))
                    }
                  >
                    <CustomText
                      keyboardType="numericd"
                      weight="bold"
                      style={{ fontSize: 18 }}
                    >
                      +
                    </CustomText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View>
              <View style={styles.listTypeWrapper}>
                <TouchableOpacity
                  style={[styles.listTypeTag]}
                  key={695949}
                  onPress={() => {
                    setInputValues((prev) => ({
                      ...prev,
                      unitType: "kg",
                    }));
                  }}
                >
                  <View
                    style={{
                      opacity: "kg" === inputValues.unitType ? 0.1 : 1,
                    }}
                  >
                    <CustomText weight="bold" style={{ fontSize: 12 }}>
                      kg
                    </CustomText>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.listTypeTag]}
                  key={695949}
                  onPress={() => {
                    setInputValues((prev) => ({
                      ...prev,
                      unitType: "pkg",
                    }));
                  }}
                >
                  <View
                    style={{
                      opacity: "pkg" === inputValues.unitType ? 0.1 : 1,
                    }}
                  >
                    <CustomText weight="bold" style={{ fontSize: 12 }}>
                      pkg
                    </CustomText>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.listTypeTag]}
                  key={695949}
                  onPress={() => {
                    setInputValues((prev) => ({
                      ...prev,
                      unitType: "litre",
                    }));
                  }}
                >
                  <View
                    style={{
                      opacity: "litre" === inputValues.unitType ? 0.1 : 1,
                    }}
                  >
                    <CustomText weight="bold" style={{ fontSize: 12 }}>
                      litre
                    </CustomText>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.listTypeTag]}
                  key={695949}
                  onPress={() => {
                    setInputValues((prev) => ({
                      ...prev,
                      unitType: "bottle",
                    }));
                  }}
                >
                  <View
                    style={{
                      opacity: "bottle" === inputValues.unitType ? 0.1 : 1,
                    }}
                  >
                    <CustomText weight="bold" style={{ fontSize: 12 }}>
                      bottle
                    </CustomText>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {listItemId ? (
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: "4%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CustomBtn
              onPress={() => navigation.goBack()}
              width="medium"
              title="Cancel"
            />
            <CustomBtn
              onPress={() =>
                editItemToBuy({
                  ...inputValues,
                  sectionId,
                  listId,
                  listItemId,
                })
              }
              width="medium"
              title="Update"
            />
          </View>
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <CustomBtn
              onPress={() =>
                addItemToBuy({
                  ...inputValues,
                  sectionId,
                  listId,
                })
              }
              width="large"
              title="Add to list"
            />
          </View>
        )}
      </KeyboardAvoidingView>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "4%",
  },
  inputsWrapper: {
    flexDirection: "column",
  },
  amountInput: {
    backgroundColor: COLORS.lightGrey,
    borderRadius: 50,
    paddingHorizontal: 13,
    paddingVertical: 8,

    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "row",
  },
  amountTextInput: {
    fontFamily: "MontserratRegular",
    fontWeight: "500",
    fontSize: 18,
    alignItems: "center",
    textAlign: "center",
    backgroundColor: COLORS.lightGrey,
  },
  textInput: {
    backgroundColor: COLORS.lightGrey,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontFamily: "MontserratRegular",
    fontWeight: "500",
    fontSize: 18,
    alignItems: "center",
    textAlign: "center",
  },
  headerInputsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerInputs: {
    width: "70%",
  },
  headerInputsAmountContainer: {
    width: "27%",
  },
  listTypeWrapper: {
    flexDirection: "row",
    marginVertical: 14,
    justifyContent: "space-around",
    width: "100%",
  },
  listTypeTag: {
    backgroundColor: COLORS.lightGrey,
    paddingVertical: 12,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "23%",
  },
});
