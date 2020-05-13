import React from "react";
import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";
import Constants from "expo-constants";
import { connect } from "react-redux";

import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { getUserInfo, changeUsername, changeImageURL } from "../store/userInfo";
import { COLORS } from "../styles/colors";
import { CustomText } from "../components/CustomText";

const mapStateToProps = (state) => {
  return { userInfo: getUserInfo(state) };
};

export const DrawerScreen = connect(mapStateToProps, {
  changeImageURL,
  changeUsername,
})(({ userInfo, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.drawerTopSection}>
        <View style={styles.userAvatar}>
          <Image source={{ uri: userInfo.imageURL }} />
        </View>
        <CustomText
          weight="regular"
          style={{
            marginBottom: 5,
            marginLeft: 20,
            fontSize: 20,
            color: COLORS.dark,
          }}
        >
          {userInfo.username}
        </CustomText>
      </View>
      <DrawerContentScrollView style={styles.drawerItemsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddNewListStack")}
          style={[styles.drawerItem, { marginTop: -10, marginBottom: 20 }]}
        >
          <CustomText weight="bold" style={styles.drawerItemText}>
            ADD NEW LIST
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ListPageStack" , {listType : "One Time" })}
          style={[styles.drawerItem]}
        >
          <CustomText weight="bold" style={styles.drawerItemText}>
            ONE TIME LIST
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ListPageStack" , {listType : "Regular" })}
          style={[styles.drawerItem]}
        >
          <CustomText weight="bold" style={styles.drawerItemText}>
            REGULAR LIST
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("UserSettingsStack")}
          style={[styles.drawerItem]}
        >
          <CustomText weight="bold" style={styles.drawerItemText}>
            USER SETTINGS
          </CustomText>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 20,
    // alignItems: "center",
    // justifyContent: "center",
    // borderTopEndRadius: 20,
    // borderTopStartRadius: 20,
  },
  containerWrapper: {
    backgroundColor: COLORS.red,
    flex: 1,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: COLORS.red,
  },
  drawerTopSection: {
    flexDirection: "row",
    marginLeft: 16,
    marginVertical: 10,
    alignItems: "center",
  },
  drawerItem: {
    backgroundColor: "white",
    // width : "85%",
    borderRadius: 15,
    paddingVertical: 7,
    alignItems: "center",
    marginVertical: 5,
  },
  drawerItemsContainer: {
    backgroundColor: COLORS.red,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: "9%",
  },
  drawerItemText: {
    fontSize: 14,
    color: COLORS.red,
  },
});
