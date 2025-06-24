import React, { useState } from 'react';
import { TouchableOpacity, View, Text, ImageBackground, ScrollView, StyleSheet, TextInput, Linking, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateAccount({ navigation }) {
    const [email, setEmail] = useState('');

    const handleNext = () => {
        navigation.navigate("CodeVerification");
    };

    const handleTermsPress = () => {
        Linking.openURL('https://www.youtube.com/watch?v=AehQRLkVkiE');
    };

    const handlePrivacyPress = () => {
        Linking.openURL('https://www.youtube.com/watch?v=AehQRLkVkiE');
    };
    return (
        <SafeAreaView className="flex-1 bg-black" edges={['top', 'bottom', 'left', 'right']}>
            <ImageBackground className='flex-1'
                source={require('../images/background.png')}
            >
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View className="p-6 mt-[120px] flex-grow">
                        <View>
                            <Text className='text-3xl font-bold text-[#fff]'>Create your account</Text>
                            <Text className="text-[#D8D2FF] text-base font-normal mt-2.5 leading-5">

                                You're ready to explore Alley's features! Just a few steps away from it.</Text>
                            <Text className='text-sm text-[#D8D2FF] mt-9 mb-2.5'>Email</Text>
                            <TextInput
                                className="w-full mb-2.5 bg-[#3B3842] text-[#F5F6F9] rounded-xl px-4 py-4 h-14 text-lg"
                                placeholder="daniel@gmail.com"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                placeholderTextColor="gray"
                            />
                            <TouchableOpacity className="bg-[#6F27FF] py-4 w-full items-center justify-center rounded-full mt-9 h-[56px]" onPress={handleNext}>
                                <Text className='text-[#fff] text-base font-bold'>Send Code</Text>
                            </TouchableOpacity>
                        </View>
                        <Text className='text-[#9A9A9D] font-normal text-sm leading-5 mt-auto' >
                            By signing up, you are agreeing to our{' '}
                            <Text className='underline' onPress={handleTermsPress}>
                                Terms & Conditions
                            </Text>{' '}
                            and{' '}
                            <Text className='underline' onPress={handlePrivacyPress}>
                                Privacy Policy
                            </Text>
                        </Text>
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