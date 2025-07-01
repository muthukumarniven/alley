import React, { useState } from 'react';
import { TouchableOpacity, View, Text, ImageBackground, ScrollView, StyleSheet, TextInput, Modal, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CreateProfile({ navigation }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState(''); // State to hold the username value
    const [modalVisible, setModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(false); // We still need this for other potential focus effects

    const handleNext = () => {
        navigation.navigate("Home");
    };

    return (
        <SafeAreaView className="flex-1 bg-black" edges={['top', 'bottom', 'left', 'right']}>
            <ImageBackground className='flex-1'
                source={require('../images/background.png')}
            >
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View className="p-5 mt-[120px] flex-grow" >
                        <View>
                            <Text className='text-3xl font-bold text-[#fff]'>Tell us about you</Text>
                            <Text className="text-[#D8D2FF] text-base font-normal mt-2.5 leading-5">
                                Enter the below details</Text>
                            <Text className='text-sm text-[#D8D2FF] mt-9 mb-2.5'>Your name</Text>
                            <View className="flex-row w-full justify-between">
                                <TextInput
                                    className="w-[48%] bg-[#3B3842] text-[#F5F6F9] rounded-xl px-4 py-4 h-14 text-base"
                                    placeholder="First Name"
                                    placeholderTextColor="gray"
                                    value={firstName}
                                    onChangeText={setFirstName}
                                />
                                <TextInput
                                    className="w-[48%] bg-[#3B3842] text-[#F5F6F9] rounded-xl px-4 py-4 h-14 text-base"
                                    placeholder="Last Name"
                                    placeholderTextColor="gray"
                                    value={lastName}
                                    onChangeText={setLastName}
                                />
                            </View>

                            <Text className="text-sm text-[#D8D2FF] mb-2.5 mt-7">Username</Text>

                            <View
                                className="flex-row items-center bg-[#3B3842] px-3 rounded-[12px] h-14 flex-row justify-between items-center4"
                            >
                                <Ionicons
                                    name="at"
                                    size={22}
                                    color="#A9A9A9"
                                    style={{ marginHorizontal: 1 }}
                                />
                                <TextInput
                                    className="flex-1 h-full text-base text-white ml-1"
                                    placeholder="Type"
                                    placeholderTextColor="#A9A9A9"
                                    value={searchText}
                                    onChangeText={setSearchText}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    selectionColor="#5A9DFF"
                                />

                                <TouchableOpacity>
                                    <Image className="mx-2"
                                        source={require('../images/usernameIcon.png')}
                                    />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity className="bg-white py-4 w-full items-center justify-center rounded-full mt-9 h-14"
                                onPress={() => setModalVisible(true)}>
                                <Text className="text-black text-base font-bold">Proceed</Text>
                            </TouchableOpacity>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => setModalVisible(false)}
                            >
                                <View className="flex-1 bg-[#000000B3] justify-end items-center mb-11 w-full h-full">
                                    <View className="w-[90%] bg-[#1C142B] rounded-2xl p-4 items-center" >
                                        <Text className="font-bold text-3xl text-white mt-11" >Congrats</Text>
                                        <Text className="text-[#D8D2FF] mt-1 text-base">You have successfully created your profile</Text>
                                        <TouchableOpacity className="bg-white py-3 px-6 rounded-[36px] mt-28 w-full h-14 flex-row items-center justify-center"
                                            onPress={() => {
                                                setModalVisible(false);
                                                handleNext();
                                            }}
                                        >
                                            <Text className="text-[#111013] font-bold text-base">Continue</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
})