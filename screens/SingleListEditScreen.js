import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { connect } from "react-redux";

import {
  getItemsToBuy,
  deleteItemToBuy,
  toggleItemToBuy,
  resetShoplist,
} from "../store/listTypes";
import { COLORS } from "../styles/colors";
import { AddItemToBuyForm } from "../components";
import { Header } from "./SingleListEdit/Header";
import { ItemsToBuyList } from "./SingleListEdit/ItemsToBuyList";

const mapStateToProps = (state, { route }) => {
  return { itemsToBuyList: getItemsToBuy(state, route) };
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
  resetShoplist,
})(
  ({
    itemsToBuyList,
    navigation,
    route,
    deleteItemToBuy,
    toggleItemToBuy,
    resetShoplist,
  }) => {
    console.log("route--- from Single List ", route);

    const sortedList = itemsToBuyList
      ? itemsToBuyList.sort((a, b) => {
          if (a.completed === b.completed) return 0;
          if (a.completed) return 1;
          if (b.completed) return -1;
        })
      : [];

    const [singleEditItemState, setSingleEditItemState] = useState(
      singleEditItemInitialState
    );

    const totalItems = itemsToBuyList?.length || 0;
    const boughtItems =
      itemsToBuyList?.filter((item) => item.completed === true).length || 0;

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
                listType: route.params.listType,
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
      <View style={styles.containerWrapper}>
        <View style={styles.outerWrapper}>
          {route.params.isEditMode && (
            <AddItemToBuyForm
              onCancelEditItem={onCancelEditItem}
              navigation={navigation}
              sectionId={route.params.sectionId}
              listId={route.params.listId}
              singleEditItemState={singleEditItemState}
              route={route}
            />
          )}

          {!route.params.isEditMode && (
            <Header
              boughtItems={boughtItems}
              totalItems={totalItems}
              route={route}
              onResetShoplist={() => resetShoplistHandler()}
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
      </View>
    );
  }
);

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
