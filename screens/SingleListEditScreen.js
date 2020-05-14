import React from "react";
import { StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";

import { getListTypes, deleteItemToBuy } from "../store/listTypes";
import { COLORS } from "../styles/colors";
import { ItemToBuyCardEdit } from "../components";

const mapStateToProps = (state) => {
  return { listTypes: getListTypes(state) };
};

export const SingleListEditScreen = connect(mapStateToProps, {
  deleteItemToBuy,
})(({ listTypes, route, deleteItemToBuy }) => {
  const itemsToBuyList = listTypes
    .filter((listType) => listType.id === route.params.sectionId)[0]
    .shopLists.filter((item) => item.id === route.params.listId)[0].itemsToBuy;

  const sortedList = itemsToBuyList.sort((a, b) => {
    if (a.completed === b.completed) return 0;
    if (a.completed) return 1;
    if (b.completed) return -1;
  });

  return (
    <View style={styles.containerWrapper}>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{ marginVertical: 10 }}
          data={sortedList}
          renderItem={({ item }) => (
            <ItemToBuyCardEdit
              deleteHandler={() => {
                Alert.alert(
                  " Delete ",
                  "No Way to Undo ",
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
                          listItemId: item.id,
                        }),
                    },
                  ],
                  { cancelable: false }
                );
              }}
              key={item.id}
              style={[styles.itemToBuyCard]}
              item={item}
            />
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
