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
import AddToCollectionFlow from './components/AddToCollectionFlow';
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
    {
        id: 'item3',
        mainImage: require('../images/female.jpg'),
        avatarImage: require('../images/ocean.jpg'),
        username: '@naruto sdfsd sdfsdf sdfsdfsdf sdfsdfsdf dsf',
    },
];

const collectionsDataForModal = [
    { id: 'c1', title: 'Top 5 Kamakura peaceful cafes', imageCount: 2, image: require('../images/ocean.jpg') },
    { id: 'c2', title: 'Tokyo Nightlife', imageCount: 15, image: require('../images/mountain.jpg') },
    { id: 'c3', title: 'Kyoto Temples', imageCount: 8, image: require('../images/female.jpg') },
];

const allCompanionsForModal = [
    { id: 'comp1', name: 'Alex Johnson', image: require('../images/ocean.jpg') },
    { id: 'comp2', name: 'Sophie Martinez', image: require('../images/female.jpg') },
    { id: 'comp3', name: 'Muthukumar S', image: require('../images/mountain.jpg') },
    { id: 'comp4', name: 'Yuki Tanaka', image: require('../images/female.jpg') },
];


export default function Collections({ navigation }) {
    const [addedItems, setAddedItems] = useState(new Set());
    const [isAddToCollectionModalVisible, setAddToCollectionModalVisible] = useState(false);

    const handleNext = () => navigation.navigate("Explore");
    const yukiAvatar = require('../images/female.jpg');

    const handleAddItemPress = (itemId) => {
        const newAddedItems = new Set(addedItems);
        if (newAddedItems.has(itemId)) {

        } else {
            newAddedItems.add(itemId);
        }
        setAddedItems(newAddedItems);

        setAddToCollectionModalVisible(true);
    };

    const handleCreateCollection = (data) => {
        console.log("Collection flow completed with data:", data);
        // You can add logic here to handle the newly created collection
        setAddToCollectionModalVisible(false);
    };

    const baseButtonStyles = "flex-row items-center py-3 px-7 rounded-full shadow-lg shadow-black";

    return (
        <SafeAreaView className="flex-1 bg-black">
            <ImageBackground
                className="flex-1"
                source={require('../images/background.png')}
            >
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View className="p-5">
                        <TouchableOpacity onPress={handleNext} className="bg-[#2D2D3A] w-12 h-12 rounded-full items-center justify-center">
                            <Feather name="chevron-left" size={28} color="#FFFFFF" />
                        </TouchableOpacity>
                        <Text className='text-[40px] mt-5 font-bold text-white'>Top 10 Places in Japan</Text>
                        <View className="flex-row items-center gap-2 mt-3">
                            <Image source={yukiAvatar} className="w-6 h-6 rounded-full" />
                            <Text className="text-neutral-300 font-medium text-sm">@yuki</Text>
                        </View>
                        <View className="h-px bg-neutral-600 mt-3 mb-4" />

                        {/* --- Mapped List Items --- */}
                        {listData.map((item, index) => (
                            <View
                                key={item.id}
                                className={`w-full mb-8 ${index % 2 === 0 ? 'items-start' : 'items-end'}`}
                            >
                                <View className="w-[227px] rounded-3xl shadow-xl shadow-black/40">
                                    <Image
                                        source={item.mainImage}
                                        className="w-full h-[227px] rounded-3xl"
                                    />
                                    <TouchableOpacity
                                        onPress={() => handleAddItemPress(item.id)}

                                    >
                                        <LinearGradient
                                            colors={[
                                                'rgba(167, 167, 167, 0.6)',
                                                'rgba(67, 66, 69, 0.6)',
                                                'rgba(27, 29, 46, 0.6)'
                                            ]}
                                            start={{ x: 0.5, y: 0 }}
                                            end={{ x: 0.5, y: 1 }}
                                            className="absolute right-6 bottom-[-20] w-12 h-12 bg-[#383848] rounded-full justify-center items-center  shadow-lg shadow-black/30"
                                        >
                                            {addedItems.has(item.id) ? (
                                                <Feather name="check" size={24} color="#66ff99" />
                                            ) : (
                                                <Feather name="plus" size={24} color="#E0E0E0" />
                                            )}
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                                <View className={`mt-5 ${index % 2 === 0 ? 'ml-2' : 'mr-2'}`}>
                                    <View className="flex-row items-center">
                                        <Image
                                            source={item.avatarImage}
                                            className="w-6 h-6 rounded-full mr-3"
                                        />
                                        <Text numberOfLines={1} className="text-white text-base font-semibold w-[170px]">
                                            {item.username}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                <View className="absolute bottom-[30px] left-0 right-0 flex-row justify-center items-center pt-5 pb-2.5">
                    <TouchableOpacity >

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
                            <MaterialCommunityIcons name="share-variant-outline" size={24} color="white" />
                            <Text className="text-white text-base font-semibold ml-2.5">Share</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity>
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
                            <Feather name="bookmark" size={24} color="white" />
                            <Text className="text-white text-base font-semibold ml-2.5">Save</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* --- Add to Collection Flow Modal --- */}
                <AddToCollectionFlow
                    visible={isAddToCollectionModalVisible}
                    onClose={() => setAddToCollectionModalVisible(false)}
                    onCreate={handleCreateCollection}
                    collectionsData={collectionsDataForModal}
                    allCompanions={allCompanionsForModal}
                />
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 120, // Increased padding to ensure last item is not covered by buttons
    },
});