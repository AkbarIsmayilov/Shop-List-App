import React, { useState } from "react";
import { StyleSheet, KeyboardAvoidingView, View, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";

import {
  getListTypes,
  deleteItemToBuy,
  toggleItemToBuy,
  resetShoplist,
} from "../store/listTypes";
import { COLORS } from "../styles/colors";
import { AddItemToBuyForm } from "../components";
import { Header } from "./SingleListEdit/Header";
import { ItemsToBuyList } from "./SingleListEdit/ItemsToBuyList";
const mapStateToProps = (state) => {
  return { listTypes: getListTypes(state) };
};

const singleEditItemInitialState = {
  status: false,
  product: {
    name: "",
    amount: 1,
    unitType: "kg",
  },
};

export const SingleListEditScreen = connect(mapStateToProps, {
  deleteItemToBuy,
  toggleItemToBuy,
})(({ listTypes, navigation, route, deleteItemToBuy, toggleItemToBuy }) => {
  const itemsToBuyList = listTypes
    .filter((listType) => listType.id === route.params.sectionId)[0]
    .shopLists.filter((item) => item.id === route.params.listId)[0].itemsToBuy;

  const sortedList = itemsToBuyList.sort((a, b) => {
    if (a.completed === b.completed) return 0;
    if (a.completed) return 1;
    if (b.completed) return -1;
  });

  const [singleEditItemState, setSingleEditItemState] = useState(
    singleEditItemInitialState
  );

  const totalItems = itemsToBuyList.length;
  const boughtItems = itemsToBuyList.filter((item) => item.completed === true)
    .length;

  const resetShoplistHandler = () => {
    resetShoplist({
      sectionId: route.params.sectionId,
      listId: route.params.listId,
    });
  };

  const deleteHandler = (itemId) => {
    Alert.alert(
      " Delete ",
      "No Way to  Undo ",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () =>
            deleteItemToBuy({
              sectionId: route.params.sectionId,
              listId: route.params.listId,
              listItemId: itemId,
            }),
        },
      ],
      { cancelable: false }
    );
  };
  const resetFormData = () =>
    setSingleEditItemState(singleEditItemInitialState);

  const onCancelEditItem = () => resetFormData();

  const goEditScreenHandler = (item) => {
    setSingleEditItemState({
      status: true,
      product: item,
    });
  };

  const toggleItemHandler = (itemId) => {
    toggleItemToBuy({
      sectionId: route.params.sectionId,
      listId: route.params.listId,
      listItemId: itemId,
    });
  };

  return (
    <KeyboardAvoidingView style={styles.containerWrapper}>
      <View style={styles.outerWrapper}>
        {route.params.isEditMode && (
          <AddItemToBuyForm
            onCancelEditItem={onCancelEditItem}
            navigation={navigation}
            sectionId={route.params.sectionId}
            listId={route.params.listId}
            singleEditItemState={singleEditItemState}
          />
        )}

        {!route.params.isEditMode && (
          <Header
            boughtItems={boughtItems}
            totalItems={totalItems}
            route={route}
            resetShoplistHandler={resetShoplistHandler}
          />
        )}
        <ItemsToBuyList
          route={route}
          toggleItemHandler={toggleItemHandler}
          deleteHandler={deleteHandler}
          goEditScreenHandler={goEditScreenHandler}
          sortedList={sortedList}
          itemOnEditByProp={singleEditItemState.product?.id}
        />
      </View>
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  outerWrapper: {
    paddingTop: 11,
    backgroundColor: "white",
    flex: 1,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  containerWrapper: {
    backgroundColor: COLORS.red,
    flex: 1,
  },
});
