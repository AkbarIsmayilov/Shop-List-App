import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { getListTypes, deleteShoplist } from "../store/listTypes";
import { ListCard } from "../components/ListCard";
import { COLORS } from "../styles/colors";

const mapStateToProps = (state) => {
  return { listTypes: getListTypes(state) };
};

export const ListPageScreen = connect(mapStateToProps, { deleteShoplist })(
  ({ listTypes, navigation, route, deleteShoplist }) => {
    console.log("route +++++ ", route);

    const currentScreen = route.params?.listType || "One Time";
    const sortedList = listTypes.filter(
      (listType) => listType.name === currentScreen
    )[0];

    const deleteListHandler = (listId, listName) => {
      Alert.alert(
        `Are You sure you want to delete ${listName} ? `,
        `No way to Undo `,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "yes, sure ",
            onPress: () => {
              deleteShoplist({
                listType: currentScreen,
                listId,
              });
            },
          },
        ]
      );
    };

    return (
      <View style={styles.containerWrapper}>
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={styles.flatListContainer}
            data={sortedList.shopLists}
            renderItem={({ item }) => (
              <TouchableOpacity
                onLongPress={() => deleteListHandler(item.id, item.name)}
                onPress={() =>
                  navigation.navigate("SingleListEdit", {
                    sectionId: sortedList.id,
                    listId: item.id,
                    title: item.name,
                    currentScreen,
                    isEditMode: false,
                    listType: currentScreen,
                  })
                }
                style={styles.shopListCard}
              >
                <ListCard listType={currentScreen} shopList={item} />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    flex: 1,
    paddingTop: 15,
    backgroundColor: "white",
  },
  flatListContainer: {
    paddingHorizontal: "4%",
  },
  shopListCard: {
    width: "100%",
    marginBottom: 10,
  },
  containerWrapper: {
    backgroundColor: COLORS.red,
    flex: 1,
  },
});
