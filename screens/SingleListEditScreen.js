import React from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";

import {
  getListTypes,
  deleteItemToBuy,
  toggleItemToBuy,
  resetShoplist,
} from "../store/listTypes";
import { COLORS } from "../styles/colors";
import { ItemToBuyCardEdit, AddItemToBuyForm } from "../components";
import { CustomText } from "../components/CustomText";
import { Header } from "./SingleListEdit/Header";
const mapStateToProps = (state) => {
  return { listTypes: getListTypes(state) };
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

  const goEditScreenHandler = (itemId) => {
    navigation.replace("SingleListEdit", {
      sectionId: route.params.sectionId,
      listId: route.params.listId,
      listItemId: itemId,
      isEditMode: true,
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
            navigation={navigation}
            sectionId={route.params.sectionId}
            listId={route.params.listId}
            listItemId={route.params.listItemId ? route.params.listItemId : 0}
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
        <ScrollView>
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
                  goEditScreen={() => goEditScreenHandler(item.id)}
                  key={item.id}
                  item={item}
                  style={[styles.itemToBuyCard]}
                  itemId={item.id}
                  listItemId={
                    route.params.listItemId ? route.params.listItemId : 0
                  }
                />
              </View>
            )}
          />
        </ScrollView>
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
