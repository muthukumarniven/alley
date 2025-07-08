import React, { useRef } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ImageBackground,
    ScrollView,
    StatusBar,
    Image,
    Animated,
    PanResponder,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const SHEET_MAX_HEIGHT = SCREEN_HEIGHT * 0.97;
const SHEET_MIN_HEIGHT = SCREEN_HEIGHT * 0.20;

export default function Canvas({ navigation }) {

    const handleNext = () => navigation.navigate("ProfileCollection");
    const animatedValue = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                animatedValue.setOffset(animatedValue._value);
            },

            onPanResponderMove: (e, gesture) => {
                animatedValue.setValue(gesture.dy);
            },

            onPanResponderRelease: (e, gesture) => {
                animatedValue.flattenOffset();
                if (gesture.dy > 100 || gesture.vy > 0.5) {
                    closeSheet();
                }
                else if (gesture.dy < -100 || gesture.vy < -0.5) {
                    openSheet();
                }
                else {
                    if (animatedValue._value < -SHEET_MAX_HEIGHT / 3) {
                        openSheet();
                    } else {
                        closeSheet();
                    }
                }
            },
        })
    ).current;

    const openSheet = () => {
        Animated.spring(animatedValue, {
            toValue: -SHEET_MAX_HEIGHT,
            useNativeDriver: true,
        }).start();
    };

    const closeSheet = () => {
        Animated.spring(animatedValue, {
            toValue: -SHEET_MIN_HEIGHT,
            useNativeDriver: true,
        }).start();
    };

    const sheetTranslateY = animatedValue.interpolate({
        inputRange: [-SHEET_MAX_HEIGHT, -SHEET_MIN_HEIGHT],
        outputRange: [-SHEET_MAX_HEIGHT, -SHEET_MIN_HEIGHT],
        extrapolate: 'clamp',
    });

    React.useEffect(() => {
        closeSheet();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-black">
            <ImageBackground
                className="flex-1"
                source={require('../images/background.png')}
            >
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
                <ScrollView>
                    <View className="p-5">
                        <View className="relative flex-row items-center justify-between">
                            <TouchableOpacity
                                onPress={handleNext}
                                className="bg-[#2D2D3A] w-[40px] h-[40px] rounded-full items-center justify-center"
                            >
                                <Feather name="chevron-left" size={24} color="#FFFFFF" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="bg-[#2D2D3A] w-[40px] h-[40px] rounded-full items-center justify-center"
                            >
                                <FontAwesome5 name="pencil-alt" size={18} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        <View className="flex-row gap-2 mt-5">
                            <Image
                                source={require('../images/ocean.jpg')}
                                className="w-12 h-12 rounded-full"
                            />
                            <Image
                                source={require('../images/female.jpg')}
                                className="w-12 h-12 rounded-full"
                            />
                        </View>
                        <View className="mt-4">
                            <Image
                                source={require('../images/female.jpg')}
                                className="w-full h-[500px] rounded-3xl"
                            />
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>

            <Animated.View
                {...panResponder.panHandlers}
                style={{
                    position: 'absolute',
                    bottom: -SHEET_MAX_HEIGHT,
                    left: 0,
                    right: 0,
                    height: SHEET_MAX_HEIGHT,
                    backgroundColor: '#22222A',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    transform: [{ translateY: sheetTranslateY }],
                }}
            >
                <View className="items-center py-4">
                    <View className="w-12 h-1.5 bg-gray-400 rounded-full" />
                </View>

                <ScrollView>
                    <View className="p-5 pt-0">
                        <Text className="text-[#F5F6F9] text-[21px] font-bold">Country side beach</Text>
                        <Text className="text-[#D8D2FF] text-base mt-1">Osaka, Japan</Text>

                        <View className="bg-[#383844] p-4 rounded-lg flex-row items-center my-4">
                            <FontAwesome5 name="medal" size={16} color="#FFD700" />
                            <Text className="text-[#F5F6F9] text-sm ml-2">This is an off-beat location</Text>
                        </View>

                        <Text className="text-[#D8D2FF] text-base leading-6">
                            Nestled in the bustling streets of Osaka, the cozy cafe "Sakura Breeze" offers a delightful escape from the city's hustle and bustle. As you step inside, the aroma of freshly brewed coffee mingles with the sweet scent of matcha pastries. The warm wooden decor and soft lighting create an inviting atmosphere, perfect for relaxing or catching up with friends....
                        </Text>

                        <Text className="text-[#F5F6F9] text-base font-bold mt-6 mb-3">Location</Text>
                        <Image
                            source={require('../images/map.png')} // Make sure you have a map image
                            className="w-full h-48 rounded-2xl"
                        />
                        <View className="h-24" />
                    </View>
                </ScrollView>
            </Animated.View>
        </SafeAreaView>
    );
}