import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useSafeAreaInsets } from "react-native-safe-area-context";
 
const CustomTabBar = ({ state }) => {

  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
 
  const tabs = [
    {
      name: "Home",
      icon: "home",
      type: "SimpleLineIcons",
      screen: "Home",
    },
    {
      name: "ChooseAvatar",
      icon: "pluscircleo",
      type: "AntDesign",
      screen: "ChooseAvatar",
    },
    { name: "Profile", icon: "user", type: "AntDesign", screen: "Profile" },
  ];
 
  const goToScreen = async (screen) => {
   console.log(screen)
  };
 
  return (
    <View style={[styles.container]}>
      {tabs.map((tab, index) => {
        const isFocused = state === index;
        const isChooseAvatar = tab.name === "ChooseAvatar";
 
        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => goToScreen(tab.screen)}
            disabled={loading} // disable all tabs while loading
            style={[
              styles.tabButton,
              Platform.OS === "android"
                ? { paddingVertical: 10 }
                : { paddingBottom: insets.bottom - 10, paddingTop: 10 },
            ]}
          >
            <View style={isFocused ? styles.centerTab : null}>
              {isChooseAvatar && loading ? (
                <ActivityIndicator size={20} color={BaseColors.seagull} />
              ) : tab.type === "MaterialCommunityIcons" ? (
                <SimpleLineIcons
                  name={tab.icon}
                  size={28}
                  color={"red"}
                />
              ) : (
                <AntDesign
                  name={tab.icon}
                  size={24}
                  color={"red"}
                />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabButton: {
    alignItems: "center",
    flex: 1,
  },
  centerTab: {
    backgroundColor: "red",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
 
export default CustomTabBar;
 
 