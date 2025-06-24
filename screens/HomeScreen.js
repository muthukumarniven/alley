// import React from 'react';
// import { ImageBackground, StyleSheet, ScrollView, Image, View, TouchableOpacity, Text } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { LinearGradient } from 'expo-linear-gradient';
// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import IoniconsIcon from 'react-native-vector-icons/Ionicons';


// const imageList = [
//     require('../images/female.jpg'),
//     require('../images/mountain.jpg'),
//     require('../images/female.jpg'),
//     require('../images/female.jpg'),
//     require('../images/female.jpg'),
//     require('../images/female.jpg'),
// ];
// export default function HomeScreen() {
//     return (
//         <SafeAreaView className="flex-1">
//             <ImageBackground className='flex-1'
//                 source={require('../images/female.jpg')}
//                 blurRadius={20}
//             >
//                 <ScrollView contentContainerStyle={styles.scrollContainer}>
//                     <LinearGradient
//                         colors={['rgb(0, 0, 0)', 'transparent']}
//                         className="absolute left-0 right-0 top-0 h-[80%]"
//                     />
//                     <View className="p-6 z-50">
//                         <View className="flex-row items-center justify-between py-8">
//                             <Image className="w-[86px] h-[37px] object-cover"
//                                 source={require('../images/alley.png')}
//                             />
//                             <TouchableOpacity>
//                                 <IoniconsIcon name="notifications-outline" size={28} color="#fff" />
//                             </TouchableOpacity>
//                         </View>

//                         <View className="flex-row items-center justify-center relative">
//                             <Image className="w-[200px] h-[262px] object-cover rounded-3xl"
//                                 source={require('../images/female.jpg')}
//                                 blurRadius={14}
//                             />
//                             <TouchableOpacity style={styles.cameraIconContainer} className="absolute top-1/1 left-1/1 transform -translate-x-1/1 -translate-y-1/1 z-10  rounded-[100px] p-5" >
//                                 <FontAwesomeIcon name="camera" size={26} color="#fff" />
//                             </TouchableOpacity>
//                         </View>

//                         <View className="items-center mt-5">
//                             <TouchableOpacity style={styles.frostedContainer}
//                                 className="flex-row items-center justify-center max-w-[175px] w-full px-3 py-2 rounded-xl">
//                                 <Image className="w-6 h-6" source={require('../images/swipe.png')} />
//                                 <Text className="text-[#ADAEB1] ml-1 font-medium text-center text-[10px]">Pull down to take photos</Text>
//                             </TouchableOpacity>
//                         </View>


//                         <View style={{ backgroundColor: 'rgba(35, 34, 37, 0.68)' }} className="p-5 rounded-[20px] mt-5">
//                             <View className="border-b border-[#F5F6F9]">
//                                 <ScrollView
//                                     horizontal
//                                     showsHorizontalScrollIndicator={false}
//                                     className="flex-row gap-3 mb-4 "
//                                 >
//                                     {imageList.map((imgSrc, index) => (
//                                         <Image
//                                             key={index}
//                                             source={imgSrc}
//                                             className="w-[82px] h-[82px] object-cover rounded-xl z-10"
//                                         />
//                                     ))}
//                                 </ScrollView>
//                             </View>

//                             <Text className="mt-4 text-[#A1A2A4] text-base font-semibold">Recently created</Text>

//                             <LinearGradient
//                                 colors={[
//                                     'rgba(44, 43, 47, 0.6)',   // #2C2B2F with 60% opacity
//                                     'rgba(44, 43, 47, 0.6)',
//                                     'rgba(27, 29, 46, 0.6)'    // #1B1D2E with 60% opacity
//                                 ]}
//                                 start={{ x: 0.5, y: 0 }}
//                                 end={{ x: 0.5, y: 1 }}
//                                 className=" p-5 flex-row justify-between items-center mt-4"
//                                 style={{ borderColor: "#363539", borderWidth: 1, borderRadius: 20 }}
//                             >
//                                 <Text className="text-lg text-[#F5F6F9] font-bold text-lg">Top 10 Places in {'\n'}
//                                     Japan</Text>
//                                 <View className=" flex-row items-center justify-end mt-5">
//                                     <Image
//                                         source={require('../images/female.jpg')}
//                                         className="w-[60px] h-[60px] rounded-2xl border-[5px] border-[#fff] absolute right-9 top-[-35px]"
//                                         style={styles.imageOne}
//                                     />
//                                     <Image
//                                         source={require('../images/mountain.jpg')}
//                                         className="w-[60px] h-[60px] rounded-2xl border-[5px] border-[#fff] absolute right-5 top-[-42px]"
//                                         style={styles.imageTwo}
//                                     />
//                                     <Image
//                                         source={require('../images/ocean.jpg')}
//                                         className="w-[60px] h-[60px] rounded-2xl absolute top-[-35px]"
//                                         style={styles.imageThree}
//                                     />
//                                 </View>
//                             </LinearGradient>
//                         </View>
//                     </View>
//                     <LinearGradient
//                         colors={['transparent', 'rgb(0, 0, 0)']}
//                         className="absolute left-0 right-0 bottom-0 h-[98%]"
//                     />
//                 </ScrollView>
//             </ImageBackground>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     scrollContainer: {
//         flexGrow: 1,
//     },
//     cameraIconContainer: {
//         backgroundColor: 'rgba(255, 255, 255, 0.3)', // ✅ Correct: string
//     },
//     frostedContainer: {
//         backgroundColor: '#494A50',
//         borderColor: "#5D5D61",
//         borderWidth: 1,
//     },
//     imageOne: {
//         top: -35,
//         right: 36,
//         transform: [{ rotate: '-15deg' }],
//         zIndex: 1,
//         borderColor: 'rgba(255, 255, 255, 0.75)',
//         borderWidth: 3,
//     },
//     imageTwo: {
//         top: -42,
//         right: 20,
//         transform: [{ rotate: '-5deg' }],
//         zIndex: 2,
//         borderColor: 'rgba(255, 255, 255, 0.75)',
//         borderWidth: 3,
//     },
//     imageThree: {
//         top: -35,
//         right: 0,
//         transform: [{ rotate: '15deg' }],
//         zIndex: 3,
//         borderColor: 'rgba(255, 255, 255, 0.75)',
//         borderWidth: 3,
//     },
//     topPlacesContainer: {
//         backgroundColor: 'rgba(255, 255, 255, 0.5)'
//     }
// });