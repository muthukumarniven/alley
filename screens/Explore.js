import React, { useState } from 'react';
import {
    ImageBackground,
    ScrollView,
    StatusBar,
    TextInput,
    View,
    TouchableOpacity,
    Text,
    Image,
    Modal,
    FlatList,
    Pressable,
    StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const placesData = [
    {
        id: '1',
        title: 'Top 10 Cafes in osaka, Japan',
        authorName: 'yuki',
        authorImage: require('../images/female.jpg'),
        images: [
            require('../images/female.jpg'),
            require('../images/ocean.jpg'),
            require('../images/mountain.jpg'),
        ],
    },
    {
        id: '2',
        title: 'Top 10 Cafes in osaka, Japan',
        authorName: 'yuki',
        authorImage: require('../images/female.jpg'),
        images: [
            require('../images/female.jpg'),
            require('../images/ocean.jpg'),
            require('../images/mountain.jpg'),
        ],
    },
    {
        id: '3',
        title: 'Top 10 Cafes in osaka, Japan',
        authorName: 'yuki',
        authorImage: require('../images/female.jpg'),
        images: [
            require('../images/female.jpg'),
            require('../images/ocean.jpg'),
            require('../images/mountain.jpg'),
        ],
    },
    {
        id: '4',
        title: 'Top 10 Cafes in osaka, Japan',
        authorName: 'yuki',
        authorImage: require('../images/female.jpg'),
        images: [
            require('../images/female.jpg'),
            require('../images/ocean.jpg'),
            require('../images/mountain.jpg'),
        ],
    },
        {
        id: '5',
        title: 'Top 10 Cafes in osaka, Japan',
        authorName: 'yuki',
        authorImage: require('../images/female.jpg'),
        images: [
            require('../images/female.jpg'),
            require('../images/ocean.jpg'),
            require('../images/mountain.jpg'),
        ],
    },
        {
        id: '6',
        title: 'Top 10 Cafes in osaka, Japan',
        authorName: 'yuki',
        authorImage: require('../images/female.jpg'),
        images: [
            require('../images/female.jpg'),
            require('../images/ocean.jpg'),
            require('../images/mountain.jpg'),
        ],
    },

];

const CITIES_DATA = [
    { id: '1', name: 'Tokyo sdfsdf sdfsdf sdfsdf sdfsdfsdfdsfcf dsfsdf dsfsdf sdfdsfds dfdfdfg dfg' },
    { id: '2', name: 'Osaka' },
    { id: '3', name: 'Kyoto' },
    { id: '4', name: 'Sapporo' },
    { id: '5', name: 'Fukuoka' },
    { id: '6', name: 'Nagoya' },
];


export default function Explore() {
    const [searchText, setSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isCityModalVisible, setCityModalVisible] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [tempSelectedCity, setTempSelectedCity] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleOpenCityModal = () => {
        setTempSelectedCity(selectedCity);
        setCityModalVisible(true);
    };

    const handleConfirmCitySelection = () => {
        setSelectedCity(tempSelectedCity);
        setCityModalVisible(false);
        setSearchQuery('');
    };

    const handleCloseModal = () => {
        setCityModalVisible(false);
        setSearchQuery('');
    };

    const filteredCities = CITIES_DATA.filter(city =>
        city.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderCityItem = ({ item }) => {
        const isSelected = tempSelectedCity === item.name;
        return (
            <TouchableOpacity
                onPress={() => setTempSelectedCity(item.name)}
                className="flex-row justify-between items-center py-4"
            >
                <View className="flex-1 pr-4">
                    <Text className={`text-base font-medium ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                        {item.name}
                    </Text>
                </View>
                <View
                    className={`w-6 h-6 rounded-full border-2 justify-center items-center ${isSelected ? 'border-white' : 'border-gray-600'}`}
                >
                    {isSelected && (
                        <View className="w-3 h-3 rounded-full bg-white" />
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-black" edges={['top', 'bottom', 'left', 'right']}>
            <ImageBackground className='flex-1'
                source={require('../images/background.png')}
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
                            />
                            <TouchableOpacity>
                                <Ionicons name="mic-outline" size={24} color="#A9A9A9" style={{ marginHorizontal: 5 }} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingVertical: 14, gap: 8, flexDirection: "row", alignItems: "center" }}
                        >
                            <TouchableOpacity>
                                <Ionicons name="options-outline" size={28} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-row items-center bg-[#3F3651] py-2 px-4 rounded-full">
                                <Text className="mr-2 text-[#fff]">Japan</Text>
                                <Ionicons name="close-outline" size={22} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="flex-row items-center bg-[#3F3651] py-2 px-4 rounded-full"
                                onPress={handleOpenCityModal}
                            >
                                <Text className="mr-2 text-[#fff]">{selectedCity || 'City'}</Text>
                                <Ionicons name="chevron-down-outline" size={22} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity className="flex-row items-center bg-[#3F3651] py-2 px-4 rounded-full">
                                <Text className="mr-2 text-[#fff]">Category</Text>
                                <Ionicons name="chevron-down-outline" size={22} color="white" />
                            </TouchableOpacity>
                        </ScrollView>

                        <Text className="text-[#fff] text-3xl mt-5 font-extrabold">Discover</Text>
                        <View className="flex-row flex-wrap -mx-2 mt-4">
                            {
                                placesData.map((item) => (
                                    <View key={item.id} className="w-1/2 p-2">
                                        <TouchableOpacity className="flex-1 bg-[#2D2D3A] rounded-2xl p-3">
                                            <View className="relative w-full aspect-square mb-3 flex-1 justify-center items-center">
                                                <View className="relative w-32 h-32">
                                                    <Image source={item.images[2]} className="absolute top-0 left-0 w-full h-full rounded-xl object-cover rotate-[-15deg]" style={{ borderColor: 'rgba(255, 255, 255, 0.75)', borderWidth: 3, }} />
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

            {/* City Selection Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isCityModalVisible}
                onRequestClose={handleCloseModal}
            >
                <Pressable onPress={handleCloseModal} className="flex-1 justify-end bg-black/90">
                    <Pressable className="bg-[#1C1C1E] rounded-t-3xl p-5 pb-8">
                        <View className="relative flex-row items-center justify-center mb-6">
                            <TouchableOpacity onPress={handleCloseModal} className="absolute left-0 bg-[#3A3A3C] rounded-full w-7 h-7 justify-center items-center">
                                <Ionicons name="close" size={20} color="#E5E5E5" />
                            </TouchableOpacity>
                            <Text className="text-white text-lg font-bold">
                                Select city
                            </Text>
                        </View>

                        <View className="flex-row items-center bg-[#2C2C2E] rounded-xl px-3 mb-2">
                            <Ionicons name="search" size={20} color="#8E8E93" />
                            <TextInput
                                placeholder="Search by name"
                                placeholderTextColor="#8E8E93"
                                className="flex-1 text-white text-base py-3 px-2"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                autoCorrect={false}
                            />
                        </View>

                        <FlatList
                            data={filteredCities}
                            renderItem={renderCityItem}
                            keyExtractor={(item) => item.id}
                            ItemSeparatorComponent={() => <View className="h-px bg-gray-800" />}
                            style={{ maxHeight: 240 }}
                            showsVerticalScrollIndicator={false}
                        />

                        <TouchableOpacity
                            onPress={handleConfirmCitySelection}
                            className="mt-6 py-3 items-center"
                        >
                            <Text className="text-white text-base font-semibold">Confirm</Text>
                        </TouchableOpacity>
                    </Pressable>
                </Pressable>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom:80
    },
});