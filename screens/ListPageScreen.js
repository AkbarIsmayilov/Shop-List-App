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
  ({ typeOfList, listTypes, navigation }) => {
    let currentScreen = "One Time";
    if (typeOfList) {
      currentScreen = typeOfList;
    }

    const sortedList = listTypes.filter(
      (listType) => listType.name === currentScreen
    )[0];

    const navigateToSingleListStatic = () => {
      navigation.navigate("SingleListStatic", {
        sectionId: sortedList.id,
      });
    };

    // console.log (navigation);

    return (
      <View style={styles.containerWrapper}>
        <View style={styles.container}>
          <FlatList
            data={sortedList.shopLists}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SingleListStatic", {
                    sectionId: sortedList.id,
                    listId  : item.id , 
                    title : item.name,
                    currentScreen 
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
