import React from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";

import {
  getListTypes,
  deleteItemToBuy,
  addItemToBuy,
} from "../store/listTypes";
import { COLORS } from "../styles/colors";
import { ItemToBuyCardEdit, AddItemToBuyForm } from "../components";

const mapStateToProps = (state) => {
  return { listTypes: getListTypes(state) };
};

export const SingleListEditScreen = connect(mapStateToProps, {
  deleteItemToBuy,
  addItemToBuy,
})(({ listTypes, navigation, route, deleteItemToBuy }) => {
  const itemsToBuyList = listTypes
    .filter((listType) => listType.id === route.params.sectionId)[0]
    .shopLists.filter((item) => item.id === route.params.listId)[0].itemsToBuy;

  const sortedList = itemsToBuyList.sort((a, b) => {
    if (a.completed === b.completed) return 0;
    if (a.completed) return 1;
    if (b.completed) return -1;
  });
  console.log(route);
  return (
    <View style={styles.containerWrapper}>
      <View style={styles.outerWrapper}>
        <AddItemToBuyForm
        navigation={navigation}
          sectionId={route.params.sectionId}
          listId={route.params.listId}
          listItemId={route.params.listItemId ? route.params.listItemId : 0}
        />

        <View style={styles.horizontalLine} />
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={{
              marginVertical: 20,
              paddingHorizontal: "3%",
            }}
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
                goEditScreen={() =>
                  navigation.replace("SingleListEdit", {
                    sectionId: route.params.sectionId,
                    listId: route.params.listId,
                    listItemId: item.id,
                  })
                }
                key={item.id}
                style={[styles.itemToBuyCard]}
                item={item}
                listItemId={
                  route.params.listItemId ? route.params.listItemId : 0
                }
              />
            )}
          />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {},
  outerWrapper: {
    paddingVertical: 15,
    backgroundColor: "white",
    flex: 1,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  horizontalLine: {
    width: "100%",
    marginTop: 20,
    height: 3,
    backgroundColor: COLORS.lightGrey,
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
