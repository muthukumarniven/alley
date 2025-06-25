import React from 'react';
import { TouchableOpacity, View, Text, ImageBackground, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CheckmarkIcon = () => (
    <View className="w-6 h-6 bg-yellow-400 rounded-full items-center justify-center">
        <Text className="text-black font-bold text-sm">✓</Text>
    </View>
);

export default function SaveMemory() {

    // Make sure these paths are correct for your project structure
    const blurredBackground = require('../images/female.jpg');
    const memoryImage = require('../images/female.jpg');

    const handleAddToCollection = () => {
        console.log("Add to collection pressed!");
    };

    const handleDoItLater = () => {
        console.log("I'll do it later pressed!");
    };

    return (
        <SafeAreaView className="flex-1 bg-black" edges={['top', 'bottom']}>
            <ImageBackground className='flex-1' blurRadius={70} source={blurredBackground}>
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

                {/* --- THIS IS THE FIX --- */}
                {/* I have removed the ScrollView and kept the main View */}
                {/* This View now correctly takes up all available space and pushes its content to the bottom */}
                <View className="flex-1 justify-end">

                    {/* This is the main dark content area */}
                    <View className="bg-[#1C1C1E] rounded-t-3xl items-center">

                        {/* The image that "pops out" using a negative top margin */}
                        <Image
                            source={memoryImage}
                            className="w-24 h-24 rounded-2xl -mt-16 mb-6 border-4 border-[#1C1C1E]"
                        />

                        {/* A wrapper for the rest of the content to give it padding */}
                        <View className="px-6 pb-8 w-full">
                            <View className="bg-[#3A3A3C] flex-row items-center p-3 pl-4 rounded-full">
                                <CheckmarkIcon />
                                <Text className="text-white text-base font-semibold ml-3">
                                    Your memory saved successfully.
                                </Text>
                            </View>

                            <Text className="text-zinc-400 text-base text-center mt-5 mb-6 leading-6">
                                Add your saved memory into one or more collections and make it public if you wish to share it with the world.
                            </Text>

                            <View className="flex-row justify-between space-x-3">
                                <TouchableOpacity
                                    onPress={handleDoItLater}
                                    className="bg-[#3A3A3C] flex-1 py-4 rounded-full items-center"
                                >
                                    <Text className="text-white text-base font-semibold">I'll do it later</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={handleAddToCollection}
                                    className="bg-[#A729F5] flex-1 py-4 rounded-full items-center"
                                >
                                    <Text className="text-white text-base font-semibold">Add to collection</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

            </ImageBackground>
        </SafeAreaView>
    );
}