import React, { useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ImageBackground,
    ScrollView,
    StatusBar,
    Image,
    Dimensions,
    Platform,
    UIManager,
    LayoutAnimation,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const galleryImages = [
    { id: '1', source: require('../images/mountain.jpg') },
    { id: '2', source: require('../images/female.jpg') },
    { id: '3', source: require('../images/mountain.jpg') },
    { id: '4', source: require('../images/ocean.jpg') },
    { id: '5', source: require('../images/mountain.jpg') },
    { id: '6', source: require('../images/mountain.jpg') },
    { id: '7', source: require('../images/mountain.jpg') },
    { id: '8', source: require('../images/mountain.jpg') },
    { id: '9', source: require('../images/mountain.jpg') },
    { id: '10', source: require('../images/mountain.jpg') },

];

const { width } = Dimensions.get('window');
const screenPadding = 50;
const itemSpacing = 4;
const numColumns = 3;
const itemSize = (width - screenPadding - (itemSpacing * (numColumns - 1))) / numColumns;

export default function Gallery({ navigation }) {
    const [selectedIds, setSelectedIds] = useState(new Set(['1', '7', '8']));

    const toggleSelection = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        const newSelectedIds = new Set(selectedIds);
        if (newSelectedIds.has(id)) {
            newSelectedIds.delete(id);
        } else {
            newSelectedIds.add(id);
        }
        setSelectedIds(newSelectedIds);
    };

    const renderImageTile = (item) => {
        const isSelected = selectedIds.has(item.id);
        return (
            <TouchableOpacity
                key={item.id}
                onPress={() => toggleSelection(item.id)}
                style={{
                    width: itemSize,
                    height: itemSize,
                }}
            >
                <View className="w-full h-full rounded-2xl overflow-hidden justify-center items-center">

                    {item.type === 'blurred' ? (
                        <View
                            className="w-full h-full bg-white/10"
                            style={{
                                transform: [{ scale: isSelected ? 0.7 : 1.0 }],
                                opacity: isSelected ? 0.4 : 1.0,
                            }}
                        />
                    ) : (
                        <Image
                            source={item.source}
                            className="w-full h-full"
                            style={{
                                transform: [{ scale: isSelected ? 0.7 : 1.0 }],
                                opacity: isSelected ? 0.4 : 1.0,
                            }}
                        />
                    )}

                    {isSelected && (
                        <>
                            <View style={{ borderColor: "#fff", borderWidth: 1 }} className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-[#7B43D6] justify-center items-center">
                                <Icon name="checkmark" size={18} color="white" />
                            </View>
                        </>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    const handleNext = () => navigation.navigate("ProfileCollection");
    const goBackHandle = () => {
        try {
            navigation.navigate("GalleryAddCollect")
            console.log("GalleryAddCollection")
        } catch (e) {
            console.log('hiiii nsjdfhhsf nhsjdfhjhf', e)
        }

    };

    const renderSelectedThumbnails = () => {
        const selectedItems = Array.from(selectedIds).slice(0, 3).map(id => galleryImages.find(img => img.id === id));

        const stackStyles = [
            { zIndex: 1, transform: [{ rotate: '-15deg' }], left: 12, top: 4 },
            { zIndex: 2, transform: [{ rotate: '2deg' }], left: 22, top: 2 },
            { zIndex: 3, transform: [{ rotate: '15deg' }], left: 40, top: 5 },
        ];

        return (
            <View className="w-[80px] h-[50px] relative items-center justify-center -ml-2">
                {selectedItems.map((item, index) => {
                    const style = stackStyles[index] || {};

                    return (
                        <View
                            key={item.id}
                            className="absolute w-10 h-10 p-0.5 bg-white rounded-lg"
                            style={{
                                zIndex: style.zIndex,
                                transform: style.transform,
                                left: style.left,
                                top: style.top,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.4,
                                shadowRadius: 2,
                                elevation: 5,
                            }}
                        >
                            <Image
                                source={item.source}
                                className="w-full h-full rounded-md"
                            />
                        </View>
                    );
                })}
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-black">
            <ImageBackground
                className="flex-1"
                source={require('../images/background.png')}
            >
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
                <ScrollView contentContainerClassName="pb-[150px]">
                    <View className="p-5">
                        <View className="flex-row justify-between items-center mb-4">
                            <TouchableOpacity onPress={handleNext}>
                                <Icon name="close" size={30} color="white" />
                            </TouchableOpacity>
                            <Text className="text-white text-xl font-bold">Gallery</Text>
                            <View className="w-7" />
                        </View>

                        <View className="flex-row flex-wrap gap-2">
                            {galleryImages.map(item => renderImageTile(item))}
                        </View>

                    </View>
                </ScrollView>

                <View className="absolute bottom-0 left-0 right-0 pb-5  pt-3">
                    {selectedIds.size > 0 && (
                        <LinearGradient
                            colors={[
                                'rgba(44, 43, 47, 0.6)',
                                'rgba(44, 43, 47, 0.6)',
                                'rgba(27, 29, 46, 0.6)'
                            ]}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            className="flex-row items-center bg-[#302F33] mx-4 rounded-full p-3 mb-4"
                        >

                            {renderSelectedThumbnails()}<Text className="text-white text-base ml-3 flex-1">{selectedIds.size} selected</Text>
                            <TouchableOpacity onPress={goBackHandle} className="bg-[#7B43D6] py-2 px-4 rounded-full">
                                <Text className="text-white font-bold">Add To Collection</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    )}
                    <View className="flex-row justify-center items-center gap-2">
                        <TouchableOpacity className="py-2 px-5 rounded-full">
                            <Text className="text-gray-400 text-base">Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-[#302F33] py-2 px-5 rounded-full">
                            <Text className="text-white font-bold text-base">Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="py-2 px-5 rounded-full">
                            <Text className="text-gray-400 text-base">Memory</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ImageBackground>
        </SafeAreaView>
    );
}