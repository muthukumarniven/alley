import React, { useState } from 'react';
import { ImageBackground, ScrollView, StatusBar, TextInput, View, TouchableOpacity, Text, Image,StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const placesData = [
    {
        id: '1',
        title: 'Top 10 Most Beautiful Places in Japan',
        authorName: 'yuki',
        authorImage: require('../../images/female.jpg'),
        images: [
            require('../../images/female.jpg'),
            require('../../images/ocean.jpg'),
            require('../../images/mountain.jpg'),
        ],
    },
    {
        id: '2',
        title: 'Top 10 Most Beautiful Places in Japan',
        authorName: 'yuki',
        authorImage: require('../../images/mountain.jpg'),
        images: [
            require('../../images/mountain.jpg'),
            require('../../images/female.jpg'),
            require('../../images/ocean.jpg'),
        ],
    },

];


export default function Saved() {
    const [searchText, setSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    return (
        <SafeAreaView className="flex-1 bg-black" edges={['top', 'bottom', 'left', 'right']}>
            <ImageBackground className='flex-1'
                source={require('../../images/background.png')}
            >
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

                <ScrollView contentContainerClassName="flex-grow" contentContainerStyle={styles.scrollContainer}>
                    <View className="p-6 z-50">
                        <View className="flex-row items-center bg-[#2C2A4A] rounded-[10px] h-[50px] px-4">
                            <Ionicons name="search-outline" size={22} color="#A9A9A9" style={{ marginHorizontal: 5 }} />
                            <TextInput
                                className="flex-1 h-full text-base text-white ml-1"
                                placeholder="Search"
                                placeholderTextColor="#A9A9A9"
                                value={searchText}
                                onChangeText={setSearchText}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                selectionColor="#5A9DFF"
                            />
                            <TouchableOpacity>
                                <Ionicons name="mic-outline" size={24} color="#A9A9A9" style={{ marginHorizontal: 5 }} />
                            </TouchableOpacity>
                        </View>

                        <Text className="text-[#fff] text-3xl mt-5 font-extrabold">Saved</Text>
                        <View className="flex-row flex-wrap -mx-2 mt-4">
                            {
                                placesData.map((item) => (
                                    <View key={item.id} className="w-1/2 p-2">
                                        <TouchableOpacity className="flex-1 bg-[#2D2D3A] rounded-2xl p-3">
                                            <View className="relative w-full aspect-square mb-3 flex-1 justify-center items-center">
                                                <View className="relative w-32 h-32">
                                                    <Image source={item.images[2]} className="absolute top-0 left-0 w-full h-full rounded-xl object-cover rotate-[-15deg]" style={{borderColor: 'rgba(255, 255, 255, 0.75)', borderWidth: 3, }} />
                                                    <Image source={item.images[1]} className="absolute top-0 left-0 w-full h-full rounded-xl object-cover rotate-[8deg]" style={{ borderColor: 'rgba(255, 255, 255, 0.75)', borderWidth: 3, }} />
                                                    <Image source={item.images[0]} className="absolute top-0 left-0 w-full h-full rounded-xl object-cover" style={{ borderColor: 'rgba(255, 255, 255, 0.75)', borderWidth: 3, }} />
                                                </View>
                                            </View>

                                            <Text
                                                className="text-white font-bold text-sm mb-2 h-12"
                                                numberOfLines={2}
                                            >
                                                {item.title}
                                            </Text>
                                            <View className="h-px bg-neutral-600 my-2" />
                                            <View className="flex-row items-center gap-2">
                                                <Image source={item.authorImage} className="w-6 h-6 rounded-full" />
                                                <Text className="text-neutral-300 font-medium text-sm">@{item.authorName}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                ))
                            }
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom:80
    },
});