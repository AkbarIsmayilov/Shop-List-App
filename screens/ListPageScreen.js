import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CustomBtn } from "../components/CustomButton";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { getListTypes } from "../store/listTypes";
import { ListCard } from "../components/ListCard";
import { COLORS } from "../styles/colors";

const mapStateToProps = (state) => {
  return { listTypes: getListTypes(state) };
};

export const ListPageScreen = connect(mapStateToProps)(
  ({ listTypes, navigation, route }) => {
    const currentScreen = route.params?.listType || "One Time";
    const sortedList = listTypes.filter(
      (listType) => listType.name === currentScreen
    )[0];

    return (
      <View style={styles.containerWrapper}>
        <View style={styles.container}>
          <FlatList
            data={sortedList.shopLists}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SingleListEdit", {
                    sectionId: sortedList.id,
                    listId: item.id,
                    title: item.name,
                    currentScreen,
                    isEditMode: false,
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
    paddingHorizontal: "4%",
    paddingVertical: 15,
    backgroundColor: "white",
    flex: 1,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
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
