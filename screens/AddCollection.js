import React, { useState } from 'react';
import {
    ImageBackground,
    ScrollView,
    StatusBar,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { styled } from 'nativewind';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import mapImage from '../images/map.png';
import alexImage from '../images/ocean.jpg';
import sophieImage from '../images/female.jpg';
import { BlurView } from 'expo-blur';

const StyledTextInput = styled(TextInput);

const locationData = { 'USA': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'], 'Japan': ['Tokyo', 'Osaka', 'Kyoto', 'Sapporo', 'Fukuoka'], 'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide',], 'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'], 'Germany': ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt'], };
const countries = Object.keys(locationData);

const allCompanions = [
    { id: '1', name: 'Muthukumar sivakumar sdfsdf sdfdsf sdfsdf sdfdsf', image: alexImage },
    { id: '2', name: 'Bharathidasan Durai', image: sophieImage },
    { id: '3', name: 'Muthukumar s', image: sophieImage },
    { id: '4', name: 'Muthukumar sivakumar', image: alexImage },
    { id: '5', name: 'Virat bharathi', image: sophieImage },
    { id: '6', name: 'Mahendra singh dhoni', image: sophieImage },
    { id: '7', name: 'Muthukumar s', image: alexImage },
    { id: '8', name: 'Virat', image: sophieImage },
    { id: '9', name: 'Durai raj', image: sophieImage },
    { id: '10', name: 'Muthukumar r', image: alexImage },
    { id: '11', name: 'Virat kohli', image: sophieImage },
    { id: '12', name: 'Bharathidasan', image: sophieImage },
];

const DropdownItem = ({ label, onPress }) => (<TouchableOpacity onPress={onPress} className="py-4 border-b border-b-[#3A3A4D]"><Text className="text-[#E0E0E0] text-base text-center">{label}</Text></TouchableOpacity>);

const CompanionRow = ({ companion, isSelected, onSelect }) => (
    <TouchableOpacity onPress={onSelect} className="flex-row justify-between items-center py-3">
        <View className="flex-row items-center gap-x-4 flex-shrink">
            <Image style={{ borderColor: "#fff", borderWidth: 2 }} source={companion.image} className="w-10 h-10 rounded-full" />
            <View className="flex-1 pr-4">
                <Text className="text-white text-base">{companion.name}</Text>
            </View>
        </View>
        <View className={`w-6 h-6 rounded-full justify-center items-center ${isSelected ? 'bg-yellow-400' : 'border border-gray-600'}`}>
            {isSelected && <Ionicons name="checkmark" size={16} color="white" />}
        </View>
    </TouchableOpacity>
);

export default function AddCollection({ navigation }) {
    const [memoryText, setMemoryText] = useState('');
    const [activeCategory, setActiveCategory] = useState('Food & Drinks');
    const [isLocationModalVisible, setLocationModalVisible] = useState(false);
    const [allowLocation, setAllowLocation] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [isCountryPickerVisible, setCountryPickerVisible] = useState(false);
    const [isCityPickerVisible, setCityPickerVisible] = useState(false);
    const [finalLocation, setFinalLocation] = useState(null);
    const [isOffBeat, setIsOffBeat] = useState(false);
    const [isPublicPost, setIsPublicPost] = useState(false);
    const [isCompanionModalVisible, setCompanionModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCompanions, setSelectedCompanions] = useState(new Set());
    const [finalCompanions, setFinalCompanions] = useState([]);


    const categories = [{ name: 'Food & Drinks', icon: 'hamburger' }, { name: 'Activity', icon: 'flag' }];
    const handleNext = () => navigation.navigate("Home");
    const handleSelectCountry = (country) => { setSelectedCountry(country); setSelectedCity(null); setCountryPickerVisible(false); };
    const handleSelectCity = (city) => { setSelectedCity(city); setCityPickerVisible(false); };
    const handleConfirmLocation = () => {
        if (selectedCity && selectedCountry) setFinalLocation(`${selectedCity}, ${selectedCountry}`);
        else if (allowLocation) setFinalLocation('Current Location');
        setLocationModalVisible(false);
    };

    const handleToggleCompanion = (companionId) => {
        const newSelection = new Set(selectedCompanions);
        if (newSelection.has(companionId)) newSelection.delete(companionId);
        else newSelection.add(companionId);
        setSelectedCompanions(newSelection);
    };

    const handleConfirmCompanions = () => {
        const selected = allCompanions.filter(c => selectedCompanions.has(c.id));
        setFinalCompanions(selected);
        setCompanionModalVisible(false);
    };

    const filteredCompanions = allCompanions.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const SettingsToggle = ({ label, value, onValueChange }) => (
        <View className="flex-row justify-between items-center w-full">
            <Text className="text-sm text-[#D8D2FF] mt-5 mb-2.5">{label}</Text>
            <TouchableOpacity onPress={() => onValueChange(!value)} className={`w-[50px] h-[30px] rounded-full justify-center ${value ? 'bg-[#BDAEFF]' : 'bg-[#5A5A72]'}`}>
                <View className={`w-[26px] h-[26px] rounded-full justify-center items-center ${value ? 'bg-white self-end mr-0.5' : 'bg-[#3A3A4D] self-start ml-0.5'}`}>
                    {value ? (
                        <Ionicons name="checkmark" size={18} color="#BDAEFF" />
                    ) : (
                        <Ionicons name="close" size={18} color="#9E9E9E" />
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );

    const showSuccessPopup = () => {
        // Navigate to Profile AND send a parameter to trigger the modal
        navigation.navigate("Profile", { showMemoryModal: true });
    };

    return (
        <SafeAreaView className="flex-1 bg-black" edges={['top', "bottom"]}>
            <ImageBackground className='flex-1' source={require('../images/background.png')}>
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
                <ScrollView contentContainerStyle={{ paddingBottom: 120 }} contentContainerClassName="flex-grow">
                    <View className="p-6">
                        <View className="relative flex-row justify-center items-center mt-[20px]">
                            <TouchableOpacity onPress={handleNext} className="absolute left-0 bg-[#2D2D3A] w-12 h-12 rounded-full items-center justify-center">
                                <Feather name="chevron-left" size={28} color="#FFFFFF" />
                            </TouchableOpacity>
                            <Text className="text-white text-lg font-semibold">Add a memory</Text>
                        </View>

                        <View className="flex-row justify-center mt-[19px]">
                            <Image source={require('../images/ocean.jpg')} className="w-[100px] h-[100px] rounded-xl" style={{ resizeMode: 'cover' }} />
                        </View>

                        <View className="bg-[#1E1C22] p-5 rounded-2xl mt-4">
                            <Text className="text-sm text-[#D8D2FF] mb-2.5">Username</Text>
                            <View className="flex-row items-center bg-[#3B3842] px-3 rounded-xl h-14">
                                <TextInput className="flex-1 h-full text-base text-white ml-1" placeholder="Select" placeholderTextColor="#A9A9A9" selectionColor="#5A9DFF" />
                                <TouchableOpacity><Image className="mx-2" source={require('../images/usernameIcon.png')} /></TouchableOpacity>
                            </View>

                            <Text className="text-sm text-[#D8D2FF] mt-3 mb-2.5">What’s in your mind</Text>
                            <StyledTextInput className="bg-[#3B3842] rounded-xl p-4 text-base text-white" style={{ minHeight: 150, textAlignVertical: 'top' }} placeholder="Write about the memory" placeholderTextColor="#9A9A9A" value={memoryText} onChangeText={setMemoryText} multiline={true} />

                            <Text className="text-sm text-[#D8D2FF] mt-5 mb-2.5">Category</Text>
                            <View className="flex-row p-1 rounded-xl border border-[#3B3842]">
                                {categories.map((category) => (
                                    <TouchableOpacity key={category.name} onPress={() => setActiveCategory(category.name)} className={`flex-1 p-3 rounded-xl flex-row items-center justify-center ${category.name === activeCategory ? 'bg-[#BDAEFF]' : 'bg-transparent'}`}>
                                        <Icon name={category.icon} size={16} color={category.name === activeCategory ? '#000000' : '#9E9E9E'} /><Text className={`ml-2 font-semibold ${category.name === activeCategory ? 'text-black' : 'text-[#9E9E9E]'}`}>{category.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {finalLocation ? (
                                <View className="mt-5">
                                    <Text className="text-sm text-[#D8D2FF] mt-3 mb-2.5">Location</Text>
                                    <View className="flex-row justify-between items-center mb-3">
                                        <Text className="text-[17px] text-white font-normal">{finalLocation}</Text>
                                        <TouchableOpacity onPress={() => setLocationModalVisible(true)}><Icon name="pencil-alt" size={18} color="white" /></TouchableOpacity>
                                    </View>
                                    <Image source={mapImage} className="w-full h-40 rounded-xl" resizeMode="cover" />
                                </View>
                            ) : (
                                <View>
                                    <Text className="text-sm text-[#D8D2FF] mt-5 mb-2.5">Location</Text>
                                    <View style={{ borderWidth: 1.7, borderStyle: 'dashed', borderColor: '#5A5A5A' }} className="h-48 justify-center items-center rounded-2xl">
                                        <TouchableOpacity className="flex-row items-center justify-center bg-[#6F27FF] rounded-full px-8 py-3" onPress={() => setLocationModalVisible(true)}>
                                            <Icon name="plus" size={22} color="white" /><Text className="text-white text-lg font-bold ml-2">Add</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}

                            <View className="mt-6 space-y-5">
                                <SettingsToggle label="Off-beat location" value={isOffBeat} onValueChange={setIsOffBeat} />
                                <SettingsToggle label="Post as public post" value={isPublicPost} onValueChange={setIsPublicPost} />
                            </View>

                            <Text className="text-sm text-[#D8D2FF] mt-5 mb-2.5">Companion</Text>

                            <View className="flex-row items-center gap-2 flex-wrap">
                                {finalCompanions.map(c => (
                                    <TouchableOpacity key={c.id} onPress={() => setCompanionModalVisible(true)}>
                                        <Image style={{ borderColor: "#fff", borderWidth: 2 }} source={c.image} className="w-12 h-12 rounded-full" />
                                    </TouchableOpacity>
                                ))}
                                <TouchableOpacity onPress={() => setCompanionModalVisible(true)} style={{ borderWidth: 1.3, borderStyle: 'dashed', borderColor: '#757087' }} className="w-12 h-12 rounded-full items-center justify-center">
                                    <Icon name="user-plus" size={16} color="#BDAEFF" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View className="absolute bottom-0 w-full px-5 py-5" >
                    <BlurView
                        intensity={100}
                        style={StyleSheet.absoluteFillObject}
                        tint="dark"
                    />
                    <TouchableOpacity className="w-full h-[55px] rounded-full justify-center items-center overflow-hidden border border-white/10"
                        onPress={showSuccessPopup}
                    >
                        <Text className="text-base font-semibold text-white">Save Memory</Text>
                    </TouchableOpacity>
                </View>

                {/* --- Companion Modal using React Native Core Component --- */}
                <Modal
                    visible={isCompanionModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setCompanionModalVisible(false)}
                >
                    <TouchableWithoutFeedback onPress={() => setCompanionModalVisible(false)}>
                        <View className="flex flex-1 justify-end" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', }}>
                            <TouchableWithoutFeedback>
                                <View className="bg-[#111013] px-6 pt-6 pb-8 rounded-t-2xl">
                                    <View className="relative flex-row items-center justify-center mb-5">
                                        <TouchableOpacity onPress={() => setCompanionModalVisible(false)} className="absolute left-0 bg-[#1D1C20] rounded-full w-7 h-7 justify-center items-center">
                                            <Ionicons name="close" size={20} color="#E5E5E5" />
                                        </TouchableOpacity>
                                        <Text className="text-white text-[21px] font-bold">Add companion</Text>
                                    </View>
                                    <View className="flex-row items-center bg-[#1D1C20] rounded-lg px-3 mb-4">
                                        <Ionicons name="search" size={20} color="#8E8E93" />
                                        <TextInput placeholder="Search by name" placeholderTextColor="#8E8E93" className="flex-1 h-10 text-white ml-2" value={searchQuery} onChangeText={setSearchQuery} />
                                    </View>
                                    <FlatList
                                        data={filteredCompanions}
                                        keyExtractor={item => item.id}
                                        renderItem={({ item }) => (
                                            <CompanionRow companion={item} isSelected={selectedCompanions.has(item.id)} onSelect={() => handleToggleCompanion(item.id)} />
                                        )}
                                        style={{ maxHeight: 250 }}
                                    />
                                    <TouchableOpacity className="items-center mt-6" onPress={handleConfirmCompanions}>
                                        <Text className="text-white text-lg font-medium">Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                {/* --- Location Modal using React Native Core Component --- */}
                <Modal
                    visible={isLocationModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setLocationModalVisible(false)}
                >
                    <TouchableWithoutFeedback onPress={() => setLocationModalVisible(false)}>
                        <View className="flex flex-1 justify-end" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', }}>
                            <TouchableWithoutFeedback>
                                <View className="bg-[#111013] px-6 pt-6 pb-8 rounded-t-2xl">
                                    <View className="relative flex-row items-center justify-center mb-6">
                                        <TouchableOpacity onPress={() => setLocationModalVisible(false)} className="absolute left-0 bg-[#3A3A4C] rounded-full w-7 h-7 justify-center items-center">
                                            <Ionicons name="close" size={20} color="#E5E5E5" />
                                        </TouchableOpacity>
                                        <Text className="text-white text-lg font-bold">Add location</Text></View>



                                    <View className="flex-row justify-between items-center w-full">
                                        <Text className="text-[#D8D2FF] text-base">Allow app to get your location</Text>
                                        <TouchableOpacity onPress={() => setAllowLocation(!allowLocation)} className={`w-[50px] h-[30px] rounded-full justify-center ${allowLocation ? 'bg-[#C5BFF9]' : 'bg-[#5A5A72]'}`}>
                                            <View className={`w-[26px] h-[26px] rounded-full justify-center items-center ${allowLocation ? 'bg-white self-end mr-0.5' : 'bg-[#3A3A4D] self-start ml-0.5'}`}>
                                                {allowLocation ? (
                                                    <Ionicons name="checkmark" size={18} color="#C5BFF9" />
                                                ) : (
                                                    <Ionicons name="close" size={18} color="#9E9E9E" />
                                                )}
                                            </View>
                                        </TouchableOpacity>
                                    </View>


                                    <View className="flex-row items-center my-6"><View className="flex-1 h-px bg-[#3A3A4D]" /><Text className="text-[#8A8A9E] mx-2.5 text-sm">or</Text><View className="flex-1 h-px bg-[#3A3A4D]" /></View>
                                    <Text className="text-[#D8D2FF] text-base self-start mb-2.5">Country</Text><TouchableOpacity className="bg-[#1D1C20] rounded-xl px-4 py-3.5 w-full flex-row justify-between items-center mb-5" onPress={() => setCountryPickerVisible(true)}><Text className={`text-base ${selectedCountry ? 'text-white' : 'text-[#8A8A9E]'}`}>{selectedCountry || 'Select'}</Text><Text className="text-[#8A8A9E] text-xs">▼</Text></TouchableOpacity>
                                    <Text className="text-[#D8D2FF] text-base self-start mb-2.5">City</Text><TouchableOpacity className={`bg-[#1D1C20] rounded-xl px-4 py-3.5 w-full flex-row justify-between items-center mb-5 ${!selectedCountry ? 'opacity-50' : ''}`} onPress={() => { if (selectedCountry) setCityPickerVisible(true); }} disabled={!selectedCountry}><Text className={`text-base ${selectedCity ? 'text-white' : 'text-[#8A8A9E]'}`}>{selectedCity || 'Select'}</Text><Text className="text-[#8A8A9E] text-xs">▼</Text></TouchableOpacity>
                                    <TouchableOpacity className="py-4 w-full items-center mt-2.5" onPress={handleConfirmLocation}><Text className="text-white text-lg font-bold">Confirm</Text></TouchableOpacity>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                {/* --- Country Picker Modal using React Native Core Component --- */}
                <Modal
                    visible={isCountryPickerVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setCountryPickerVisible(false)}
                >
                    <TouchableWithoutFeedback onPress={() => setCountryPickerVisible(false)}>
                        <View className="flex-1 flex justify-center items-center px-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', }}>
                            <TouchableWithoutFeedback>
                                <View className="bg-[#2D2D3A] rounded-2xl p-5 max-h-[60%] w-full">
                                    <Text className="text-white text-lg font-bold mb-4 text-center">Select a Country</Text>
                                    <FlatList data={countries} keyExtractor={(item) => item} renderItem={({ item }) => <DropdownItem label={item} onPress={() => handleSelectCountry(item)} />} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                {/* --- City Picker Modal using React Native Core Component --- */}
                <Modal
                    visible={isCityPickerVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setCityPickerVisible(false)}
                >
                    <TouchableWithoutFeedback onPress={() => setCityPickerVisible(false)}>
                        <View className="flex-1 flex justify-center items-center px-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', }}>
                            <TouchableWithoutFeedback>
                                <View className="bg-[#2D2D3A] rounded-2xl p-5 max-h-[60%] w-full">
                                    <Text className="text-white text-lg font-bold mb-4 text-center">Select a City</Text>
                                    <FlatList data={selectedCountry ? locationData[selectedCountry] : []} keyExtractor={(item) => item} renderItem={({ item }) => <DropdownItem label={item} onPress={() => handleSelectCity(item)} />} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

            </ImageBackground>
        </SafeAreaView>
    );
}
