import { COLORS } from "./colors";

export const headerDefaultStyles = {
  headerStyle: {
    height: 90,
    backgroundColor: COLORS.red,
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0,
  },
  headerTintColor: "#fff",
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};
