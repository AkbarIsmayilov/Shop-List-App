import React, { useState, useEffect } from "react";
import { View, KeyboardAvoidingView, StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";

import { COLORS } from "../styles/colors";
import { CustomBtn } from "./CustomButton";
import { addItemToBuy, getListTypes, editItemToBuy } from "../store/listTypes";
import { RadioGroup } from "./RadioGroup";
import { COUNT_TYPES } from "../utils/dataStorage";
import { Field } from "./Field";
import { CountField } from "./CountField";

const mapStateToProps = (state) => {
  return { listTypes: getListTypes(state) };
};

export const AddItemToBuyForm = connect(mapStateToProps, {
  addItemToBuy,
  editItemToBuy,
})(
  ({
    listId,
    onCancelEditItem,
    addItemToBuy,
    editItemToBuy,
    route,
    singleEditItemState,
  }) => {
    const [inputValues, setInputValues] = useState({
      name: "",
      amount: 1,
      unitType: "kg",
    });
    const resetForm = () =>
      setInputValues({
        name: "",
        amount: 1,
        unitType: "kg",
      });
    const validateForm = () => {
      if (inputValues.name.trim() === "") {
        Alert.alert("Position name can not be empty ");
        return false;
      }
      return true;
    };

    const addItemHandler = () => {
      if (validateForm()) {
        addItemToBuy({
          ...inputValues,
          listType: route.params.listType,
          listId,
        });
        onCancelEditItem();
        resetForm();
      }
    };

    const editItemHandler = () => {
      if (validateForm()) {
        editItemToBuy({
          ...inputValues,
          listType: route.params.listType,
          listId,
          listItemId: inputValues.id,
        });
        onCancelEditItem();
        resetForm();
      }
    };

    const onCancelEditItemHandler = () => {
      onCancelEditItem();
      resetForm();
    };

    const fieldChangeHandler = (key, value) => {
      setInputValues((prev) => ({
        ...prev,
        [key]: value,
      }));
    };
    useEffect(() => {
      if (singleEditItemState.status) {
        setInputValues(singleEditItemState.product);
      }
    }, [singleEditItemState]);

    return (
      <KeyboardAvoidingView>
        <View style={[styles.container]}>
          <View style={styles.inputsWrapper}>
            <View style={styles.headerInputsContainer}>
              <View style={styles.headerInputs}>
                <Field
                  width="100%"
                  label="position name"
                  value={inputValues.name}
                  onValueChange={(value) => {
                    fieldChangeHandler("name", value);
                  }}
                />
              </View>
              <View style={styles.headerInputsAmountContainer}>
                <CountField
                  amountbyProp={+inputValues.amount}
                  onValueChange={(value) => fieldChangeHandler("amount", value)}
                />
              </View>
            </View>
          </View>
          <RadioGroup
            options={COUNT_TYPES}
            onValueChange={(value) => fieldChangeHandler("unitType", value)}
            value={inputValues.unitType}
            style={{ marginVertical: 10 }}
          />
        </View>
        {singleEditItemState.status ? (
          <View style={styles.rowBtns}>
            <CustomBtn
              onPress={onCancelEditItemHandler}
              width="medium"
              title="Cancel"
            />
            <CustomBtn
              onPress={editItemHandler}
              width="medium"
              title="Update"
            />
          </View>
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <CustomBtn
              onPress={addItemHandler}
              width="large"
              title="Add to list"
            />
          </View>
        )}
        <View style={styles.horizontalLine} />
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
  horizontalLine: {
    width: "100%",
    marginTop: 20,
    height: 3,
    backgroundColor: COLORS.lightGrey,
  },
  rowBtns: {
    flexDirection: "row",
    paddingHorizontal: "4%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
