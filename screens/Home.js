import React from 'react';
import { ImageBackground, StyleSheet, ScrollView, Image, View, TouchableOpacity, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import App from './common/TabNavigation';
import CustomTabBar from './common/TabNavigation';


const imageList = [
    require('../images/female.jpg'),
    require('../images/mountain.jpg'),
    require('../images/female.jpg'),
    require('../images/female.jpg'),
    require('../images/female.jpg'),
    require('../images/female.jpg'),
];

export default function Home({ navigation }) {
    const handleNext = () => {
        navigation.navigate("AddCollection");
    };

    const notificationHandle = () => {
        navigation.navigate("Notification");
    };
    return (
        <>
            <SafeAreaView className="flex-1 bg-black" edges={['top', "bottom"]}>
                <ImageBackground className='flex-1'
                    source={require('../images/female.jpg')}
                    blurRadius={20}
                >
                    <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <LinearGradient
                            colors={['rgb(0, 0, 0)', 'transparent']}
                            className="absolute left-0 right-0 top-0 h-[80%]"
                        />
                        <View className="p-6 z-50">
                            <View className="flex-row items-center justify-between py-8">
                                <Image className="w-[86px] h-[37px] object-cover"
                                    source={require('../images/alley.png')}
                                />
                                <TouchableOpacity onPress={notificationHandle}>
                                    <IoniconsIcon name="notifications-outline" size={28} color="#fff" />
                                </TouchableOpacity>
                            </View>

                            <View className="flex-row items-center justify-center relative">
                                <Image className="w-[200px] h-[262px] object-cover rounded-3xl"
                                    source={require('../images/female.jpg')}
                                    blurRadius={14}
                                />
                                <TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', }} className="absolute top-1/1 left-1/1 transform -translate-x-1/1 -translate-y-1/1  rounded-[100px] p-5 bg-white-30" >
                                    <FontAwesomeIcon name="camera" size={26} color="#fff" />
                                </TouchableOpacity>
                            </View>

                            <View className="items-center mt-5">
                                <TouchableOpacity onPress={handleNext}
                                    className="flex-row items-center justify-center max-w-[175px] w-full px-3 py-2 rounded-xl bg-[#494A50] border border-[#5D5D61] border-[1px]">
                                    <Image className="w-6 h-6" source={require('../images/swipe.png')} />
                                    <Text className="text-[#ADAEB1] ml-1 font-medium text-center text-[10px]">Pull down to take photos</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ backgroundColor: 'rgba(35, 34, 37, 0.68)' }} className="p-5 rounded-[20px] mt-5">
                                <View className="border-b border-[#F5F6F9]">
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        className="flex-row gap-3 mb-4 "
                                    >
                                        {imageList.map((imgSrc, index) => (
                                            <Image
                                                key={index}
                                                source={imgSrc}
                                                className="w-[82px] h-[82px] object-cover rounded-xl z-10"
                                            />
                                        ))}
                                    </ScrollView>
                                </View>

                                <Text className="mt-4 text-[#A1A2A4] text-base font-semibold">Recently created</Text>

                                <LinearGradient
                                    colors={[
                                        'rgba(44, 43, 47, 0.6)',
                                        'rgba(44, 43, 47, 0.6)',
                                        'rgba(27, 29, 46, 0.6)'
                                    ]}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                    className=" p-5 flex-row justify-between items-center mt-4 border border-[#363539] rounded-[20px]"
                                // style={{ borderColor: "#363539", borderWidth: 1, borderRadius: 20 }}
                                >
                                    <Text className="text-lg text-[#F5F6F9] font-bold">Top 10 Places in {'\n'}
                                        Japan</Text>
                                    <View className=" flex-row items-center justify-end mt-5">
                                        <Image
                                            source={require('../images/female.jpg')}
                                            className="w-[60px] h-[60px] rounded-2xl absolute right-9 top-[-35px] rotate-[-15deg] z-[1]"
                                            style={styles.imageOne}
                                        />
                                        <Image
                                            source={require('../images/mountain.jpg')}
                                            className="w-[60px] h-[60px] rounded-2xl border-[5px] border-[#fff] absolute right-5 top-[-42px] rotate-[-5deg] z-[2]"
                                            style={styles.imageTwo}
                                        />
                                        <Image
                                            source={require('../images/ocean.jpg')}
                                            className="w-[60px] h-[60px] rounded-2xl absolute top-[-35px] rotate-[15deg] z-[3]"
                                            style={styles.imageThree}
                                        />
                                    </View>
                                </LinearGradient>
                            </View>
                        </View>

                        <LinearGradient
                            colors={['transparent', 'rgb(0, 0, 0)']}
                            className="absolute left-0 right-0 bottom-0 h-[98%]"
                        />
                    </ScrollView>


                </ImageBackground>
                <CustomTabBar />
            </SafeAreaView>

        </>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        // paddingBottom: 120,
    },
    imageOne: {
        borderColor: 'rgba(255, 255, 255, 0.75)',
        borderWidth: 3,
    },
    imageTwo: {
        borderColor: 'rgba(255, 255, 255, 0.75)',
        borderWidth: 3,
    },
    imageThree: {
        borderColor: 'rgba(255, 255, 255, 0.75)',
        borderWidth: 3,
    },
});