import React, { useState, useRef, useEffect } from 'react';
import { TouchableOpacity, View, Text, ImageBackground, ScrollView, StyleSheet, TextInput, Linking, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CodeVerification({ navigation }) {
    const [otp, setOtp] = useState(Array(6).fill(''));

    const handleNext = () => {
        navigation.navigate("CreateProfile");
    };
    const goBackHandle = () => {
        navigation.navigate("CreateAccount");
    };
    const handleTermsPress = () => {
        Linking.openURL('https://www.youtube.com/watch?v=AehQRLkVkiE');
    };
    const handlePrivacyPress = () => {
        Linking.openURL('https://www.youtube.com/watch?v=AehQRLkVkiE');
    };
    const inputRefs = useRef([]);
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);
    const handleInput = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };
    const handleBackspace = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
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
                            <Text className='text-3xl font-bold text-[#fff]'>Verify your email</Text>
                            <Text className="text-[#D8D2FF] text-base font-normal mt-2.5 leading-5 ">
                                This will help us keep your account safe and secure by verifying its really you.</Text>
                            <Text className='text-sm text-[#D8D2FF] mt-9 mb-2.5'>Enter code</Text>
                            <View className="flex-row gap-2.5 w-full">
                                {Array.from({ length: 6 }, (_, index) => (
                                    <TextInput
                                        key={index}
                                        className="w-[14.6%] bg-[#3B3842] text-[#F5F6F9] rounded-xl px-4 py-4 text-center h-14 text-base"
                                        maxLength={1}
                                        keyboardType="number-pad"
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        value={otp[index]}
                                        onChangeText={(text) => handleInput(text, index)}
                                        onKeyPress={(e) => handleBackspace(e, index)}
                                        textAlign="center"
                                        accessibilityLabel={`OTP digit ${index + 1}`}
                                        placeholder='0'
                                        placeholderTextColor="gray"
                                    />
                                ))}
                            </View>
                            <TouchableOpacity className="bg-[#6F27FF] py-4 w-full items-center justify-center rounded-full mt-9 h-[56px]" onPress={handleNext}>
                                <Text className='text-[#fff] text-base font-bold'>Submit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity className="mt-20" onPress={goBackHandle}>
                                <Text className="text-[17px] font-semibold text-center text-white">Go Back</Text>
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