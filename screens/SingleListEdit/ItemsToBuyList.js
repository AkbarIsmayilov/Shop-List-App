import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { COLORS } from "../../styles/colors";
import { ItemToBuyCardEdit } from "../../components";
export const ItemsToBuyList = ({
  route,
  sortedList,
  toggleItemHandler,
  deleteHandler,
  goEditScreenHandler,
  itemOnEditByProp,
}) => {
  return (
    <FlatList
      contentContainerStyle={{
        marginTop: !route.params?.isEditMode ? 10 : 25,
        paddingHorizontal: "3%",
      }}
      data={sortedList}
      renderItem={({ item }) => (
        <View
          style={{
            opacity: item.completed && !route.params.isEditMode ? 0.5 : 1,
          }}
        >
          <ItemToBuyCardEdit
            isEditMode={route.params.isEditMode}
            onLongPress={() => toggleItemHandler(item.id)}
            deleteHandler={() => deleteHandler(item.id)}
            goEditScreen={() => goEditScreenHandler(item)}
            key={item.id}
            item={item}
            isOnEdit={itemOnEditByProp === item.id}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",

    paddingHorizontal: "3%",
  },
  resetBtn: {
    backgroundColor: COLORS.red,
    width: "20%",
    paddingVertical: 4,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  resetBtnText: {
    fontSize: 10,
    color: "white",
  },
});
