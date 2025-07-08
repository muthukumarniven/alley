import React, { useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';


const listData = [
    {
        id: 'item1',
        mainImage: require('../images/female.jpg'),
        avatarImage: require('../images/ocean.jpg'),
        username: '@naruto sdfsd sdfsdf sdfsdfsdf sdfsdfsdf dsf',
    },
    {
        id: 'item2',
        mainImage: require('../images/mountain.jpg'),
        avatarImage: require('../images/ocean.jpg'),
        username: '@naruto sdfc sdfsd dsfs fsd sdfs dfssdf sdf sdfs f',
    },

];


export default function ProfileCollection({ navigation }) {
    const [addedItems, setAddedItems] = useState(new Set());

    const handleNext = () => navigation.navigate("Profile");
    const baseButtonStyles = "flex-row items-center py-3 px-7 rounded-full shadow-lg shadow-black";

    const handleNextNext = () => navigation.navigate("Gallery");
    const handleChnage = () => navigation.navigate("Canvas");


    return (
        <SafeAreaView className="flex-1 bg-black">
            <ImageBackground
                className="flex-1"
                source={require('../images/background.png')}
            >
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View className="p-5">
                        <TouchableOpacity onPress={handleNext} className="bg-[#2D2D3A] w-[40px] h-[40px] rounded-full items-center justify-center">
                            <Feather name="chevron-left" size={28} color="#FFFFFF" />
                        </TouchableOpacity>
                        <Text className='text-[40px] mt-5 font-bold text-white'>Top 10 Places in Japan</Text>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            className="flex-row items-center justify-center bg-[#282434] px-4 py-2.5 rounded-full border border-[#403C4C] my-4 min-w-[120px] max-w-[121px]"
                        >
                            <Ionicons name="earth-outline" size={18} color="#B0AACD" />

                            <Text
                                numberOfLines={1}
                                className="text-white font-semibold text-base ml-1.5 flex-shrink"
                            >
                                Public
                            </Text>
                        </TouchableOpacity>

                        {listData.map((item, index) => (
                            <TouchableOpacity onPress={handleChnage}
                                key={item.id}
                                className={`w-full mb-8 ${index % 2 === 0 ? 'items-start' : 'items-end'}`}
                            >
                                <View className="w-[227px] rounded-3xl shadow-xl shadow-black/40">
                                    <Image
                                        source={item.mainImage}
                                        className="w-full h-[227px] rounded-3xl"
                                    />
                                </View>
                            </TouchableOpacity>
                        ))}

                    </View>
                </ScrollView>

                <View className="absolute bottom-[30px] left-0 right-0 flex-row justify-center items-center pt-5 pb-2.5">
                    <TouchableOpacity>
                        <LinearGradient
                            colors={[
                                'rgba(167, 167, 167, 0.6)',
                                'rgba(67, 66, 69, 0.6)',
                                'rgba(27, 29, 46, 0.6)'
                            ]}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            className={`${baseButtonStyles} bg[#343436] mr-2.5`}
                        >
                            <FontAwesome5 name="pencil-alt" size={18} color="#9D80FF" />
                            <Text className="text-white text-base font-semibold ml-2.5">Edit</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleNextNext} >
                        <LinearGradient
                            colors={[
                                'rgba(167, 167, 167, 0.6)',
                                'rgba(67, 66, 69, 0.6)',
                                'rgba(27, 29, 46, 0.6)'
                            ]}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            className={`${baseButtonStyles} bg[#343436]`}
                        >
                            <Feather name="plus" size={24} color="#9D80FF" />
                            <Text className="text-white text-base font-semibold ml-2.5">Add</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>


            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 120, // Increased padding to ensure last item is not covered by buttons
    },
});