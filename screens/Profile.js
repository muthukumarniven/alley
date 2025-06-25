import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  ScrollView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';


const CheckmarkIcon = () => (
  <View className="w-6 h-6 bg-yellow-400 rounded-full items-center justify-center">
    <Text className="text-black font-bold text-sm">✓</Text>
  </View>
);

export default function Profile() {
  const [activeTab, setActiveTab] = useState('Collections');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isMemoryModalVisible, setMemoryModalVisible] = useState(false);

  const memoryImage = require('../images/female.jpg');


  useEffect(() => {
    const timer = setTimeout(() => {
      setMemoryModalVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleMemoryAddToCollection = () => {
    setMemoryModalVisible(false);
  };

  const handleMemoryDoItLater = () => {
    setMemoryModalVisible(false);
  };

  const tabs = ['Gallery', 'Collections', 'Tagged'];
  const allData = {
    Collections: [
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
    ],
    Gallery: [],
    Tagged: [],
  };
  const currentData = allData[activeTab];

  const handleOpenGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Please allow gallery access to continue.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowSuccessModal(true);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black" edges={['top', 'bottom', 'left', 'right']}>
      <ImageBackground className='flex-1' source={require('../images/background.png')}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View className="p-5">
            <View className="flex-row items-center gap-x-8 p-6 mt-[20px]">
              <TouchableOpacity
                onPress={handleOpenGallery}
                style={{ borderStyle: "dashed", borderWidth: 1.6, borderColor: "#fff" }}
                className="w-32 h-32 rounded-full justify-center items-center opacity-50 bg-[#281E3B] overflow-hidden"
              >
                {selectedImage ? (
                  <Image source={{ uri: selectedImage }} resizeMode="cover" className="w-full h-full rounded-full" />
                ) : (
                  <Image source={require('../images/face_2.png')} className="w-6 h-6" />
                )}
              </TouchableOpacity>
              <View className="flex-col flex-1">
                <Text className="text-white text-[20px] font-bold" numberOfLines={1} adjustsFontSizeToFit>Anna Watson</Text>
                <Text className="text-slate-400 text-lg mt-1 mb-3">@annawat</Text>
                <TouchableOpacity className="flex-row items-center justify-center gap-x-2 bg-[#3A3545] p-3 rounded-full active:bg-[#5a4f7c] min-w-[124px] max-w-[130px]" activeOpacity={0.8}>
                  <Image source={require('../images/pencil_fill.png')} className="w-4 h-4 object-cover" />
                  <Text className="text-white text-[12px] font-medium">Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="mt-8">
              <View className="flex-row mx-4">
                {tabs.map((tabName) => (
                  <TouchableOpacity key={tabName} onPress={() => setActiveTab(tabName)} className="flex-1 items-center">
                    <Text className={`font-semibold text-sm ${activeTab === tabName ? 'text-white' : 'text-gray-400'}`}>{tabName}</Text>
                    {activeTab === tabName && <View className="w-20 h-1 bg-[#BDAEFF] mt-1" />}
                  </TouchableOpacity>
                ))}
              </View>
              <View className="h-px bg-gray-700" />
            </View>

            {currentData && currentData.length > 0 ? (
              <View className="flex-row flex-wrap -mx-2 mt-4">
                {currentData.map((item) => (
                  <View key={item.id} className="w-1/2 p-2">
                    <TouchableOpacity className="flex-1 bg-[#2D2D3A] rounded-2xl p-3">
                      <View className="relative w-full aspect-square mb-3 flex-1 justify-center items-center">
                        <View className="relative w-32 h-32">
                          <Image source={item.images[2]} className="absolute top-0 left-0 w-full h-full rounded-xl object-cover transform rotate-[-15deg]" style={{ borderColor: 'rgba(255, 255, 255, 0.75)', borderWidth: 3 }} />
                          <Image source={item.images[1]} className="absolute top-0 left-0 w-full h-full rounded-xl object-cover rotate-[8deg]" style={{ borderColor: 'rgba(255, 255, 255, 0.75)', borderWidth: 3 }} />
                          <Image source={item.images[0]} className="absolute top-0 left-0 w-full h-full rounded-xl object-cover" style={{ borderColor: 'rgba(255, 255, 255, 0.75)', borderWidth: 3 }} />
                        </View>
                      </View>
                      <Text className="text-white font-bold text-sm mb-2 h-12" numberOfLines={2}>{item.title}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ) : (
              <View className="justify-center items-center mt-20">
                <Text className="text-gray-400 text-lg">No {activeTab.toLowerCase()} items yet.</Text>
              </View>
            )}
          </View>
        </ScrollView>

        <Modal
          isVisible={showSuccessModal}
          onBackdropPress={() => setShowSuccessModal(false)}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={0.6}
          style={styles.modalContainer}
        >
          <View className="bg-[#1A132A] p-6 rounded-tl-[20px] rounded-tr-[20px] items-center">
            <Text className="text-white text-[20px] font-bold mb-2.5">Congrats</Text>
            <Text className="text-[#AAA6C3] text-[14px] text-center mb-6">Successfully updated your profile picture</Text>
            <TouchableOpacity className='bg-[#F7F7FB] py-3.5 px-10 rounded-full w-full items-center' onPress={() => setShowSuccessModal(false)}>
              <Text className="text-black font-bold text-[16px]">Continue</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          isVisible={isMemoryModalVisible}
          onBackdropPress={() => setMemoryModalVisible(false)}
          onSwipeComplete={() => setMemoryModalVisible(false)}
          swipeDirection="down"
          style={styles.modalContainer}
          animationIn="slideInUp"
          animationOut="slideOutDown"
        >
          <View className="bg-[#1C1C1E] rounded-t-3xl items-center pt-4 pb-8">
            <Image
              source={memoryImage}
              className="w-24 h-24 rounded-2xl -mt-16 mb-6 border-4 border-[#1C1C1E]"
            />
            <View className="px-6 w-full">
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
                  onPress={handleMemoryDoItLater}
                  className="bg-[#3A3A3C] flex-1 py-4 rounded-full items-center"
                >
                  <Text className="text-white text-base font-semibold">I'll do it later</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleMemoryAddToCollection}
                  className="bg-[#A729F5] flex-1 py-4 rounded-full items-center"
                >
                  <Text className="text-white text-base font-semibold">Add to collection</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});