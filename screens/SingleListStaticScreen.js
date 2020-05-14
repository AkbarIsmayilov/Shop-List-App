import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";

import {
  getListTypes,
  resetShoplist,
  toggleItemToBuy,
} from "../store/listTypes";
import { COLORS } from "../styles/colors";
import { CustomText } from "../components";
import { ItemToBuyCard } from "../components";

const mapStateToProps = (state) => {
  return { listTypes: getListTypes(state) };
};

export const SingleListStaticScreen = connect(mapStateToProps, {
  resetShoplist,
  toggleItemToBuy,
})(({ listTypes, route, resetShoplist, toggleItemToBuy }) => {
  const itemsToBuyList = listTypes
    .filter((listType) => listType.id === route.params.sectionId)[0]
    .shopLists.filter((item) => item.id === route.params.listId)[0].itemsToBuy;

  const sortedList = itemsToBuyList.sort((a, b) => {
    if (a.completed === b.completed) return 0;
    if (a.completed) return 1;
    if (b.completed) return -1;
  });

  const totalItems = itemsToBuyList.length;
  const boughtItems = itemsToBuyList.filter((item) => item.completed === true)
    .length;

  const resetShoplistHandler = () => {
    resetShoplist({
      sectionId: route.params.sectionId,
      listId: route.params.listId,
    });
  };

  return (
    <View style={styles.containerWrapper}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          {route.params.currentScreen === "Regular" ? (
            <TouchableOpacity
              onPress={resetShoplistHandler}
              style={styles.resetBtn}
            >
              <CustomText weight="bold" style={styles.resetBtnText}>
                RESET
              </CustomText>
            </TouchableOpacity>
          ) : null}
          <CustomText>
            {boughtItems} / {totalItems}
          </CustomText>
        </View>
        <FlatList
          contentContainerStyle={{ marginVertical: 10 }}
          data={sortedList}
          renderItem={({ item }) => (
            <View style= {{ opacity : item.completed ? 0.5 : 1 }}>
              <ItemToBuyCard
                key={item.id}
                style={[styles.itemToBuyCard]}
                onPress={() => {
                  toggleItemToBuy({
                    sectionId: route.params.sectionId,
                    listId: route.params.listId,
                    listItemId: item.id,
                  });
                }}
                item={item}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "4%",
    paddingVertical: 15,
    backgroundColor: "white",
    flex: 1,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  itemToBuyCard: {},
  containerWrapper: {
    backgroundColor: COLORS.red,
    flex: 1,
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
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
