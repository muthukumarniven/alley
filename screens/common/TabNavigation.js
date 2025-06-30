import React, { useState } from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Platform,
    ActivityIndicator,
    Alert,
    Text
} from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

const CustomTabBar = () => {

    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const route = useRoute();

    const tabs = [
        {
            name: "Home",
            icon: "home",
            type: "SimpleLineIcons",
            screen: "Home",
        },
        {
            name: "Explore",
            icon: "find",
            type: "AntDesign",
            screen: "Explore",
        },
        {
            name: "Saved",
            icon: "book",
            type: "AntDesign",
            screen: "Saved"
        },
        {
            name: "Profile",
            icon: "user",
            type: "AntDesign",
            screen: "Profile"
        },
    ];

    const goToScreen = async (screen) => {
        console.log(screen)
        navigation.navigate(screen)
    };

    return (

        <View style={styles.container}>
            {tabs.map((tab, index) => {
                const isChooseAvatar = tab.name === "ChooseAvatar";
                const isFocused = route.name === tab.screen;

                return (
                    <TouchableOpacity
                        key={tab.name}
                        onPress={() => goToScreen(tab.screen)}
                        style={styles.tabButton}
                    // style={[
                    //     styles.tabButton,
                    //     Platform.OS === "android"
                    //         ? { paddingVertical: 10 }
                    //         : { paddingBottom: insets.bottom - 10, paddingTop: 10 },
                    // ]}
                    >
                        <View
                            // style={styles.centerTab}
                            style={[
                                styles.innerButton,
                                isFocused ? styles.activeInnerButton : null
                            ]}>
                            {tab.type === "MaterialCommunityIcons" ? (
                                <SimpleLineIcons
                                    name={tab.icon}
                                    size={20}
                                    color={"#fff"}
                                />
                            ) : (

                                <AntDesign
                                    name={tab.icon}
                                    size={20}
                                    color={isFocused ? "#E2BF55" : "#8E8E8F"}
                                />
                            )}
                            {isFocused && (
                                <Text style={styles.screenName}>{tab.name}</Text>
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
        backgroundColor: "#1D1C1F",
        alignItems: "center",
        justifyContent: "space-between",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        padding: 5,
        marginHorizontal: 24,
        borderRadius: 60,
        gap: 5
    },
    tabButton: {
        flex: 1,
    },
    screenName: {
        color: "#fff",
        fontSize: 12
    },

    innerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 15,
        gap: 8,
        height: 45,
    },

    activeInnerButton: {
        backgroundColor: "#343336",
    },

});

export default CustomTabBar;

