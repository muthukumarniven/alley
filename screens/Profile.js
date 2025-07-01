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
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTabBar from './common/TabNavigation';
import AddToCollectionFlow from './components/AddToCollectionFlow';
import MemorySuccessModal from './components/MemorySuccessModal';

const collectionsData = [
  { id: 'c1', title: 'Top 5 Kamakura peaceful cafes zfsdf zxcsdf sdfsdfv sfsd sdf', imageCount: 2, image: require('../images/ocean.jpg') },
  { id: 'c2', title: 'Tokyo Nightlife', imageCount: 15, image: require('../images/mountain.jpg') },
  { id: 'c3', title: 'Kyoto Temples', imageCount: 8, image: require('../images/female.jpg') },
  { id: 'c4', title: 'Top 5 Kamakura peaceful cafes zfsdf zxcsdf sdfsdfv sfsd sdf', imageCount: 2, image: require('../images/ocean.jpg') },
  { id: 'c5', title: 'Tokyo Nightlife', imageCount: 15, image: require('../images/mountain.jpg') },
  { id: 'c6', title: 'Kyoto Temples', imageCount: 8, image: require('../images/female.jpg') },
  { id: 'c7', title: 'Top 5 Kamakura peaceful cafes zfsdf zxcsdf sdfsdfv sfsd sdf', imageCount: 2, image: require('../images/ocean.jpg') },
  { id: 'c8', title: 'Tokyo Nightlife', imageCount: 15, image: require('../images/mountain.jpg') },
  { id: 'c9', title: 'Kyoto Temples', imageCount: 8, image: require('../images/female.jpg') },
];

const allCompanions = [
  { id: 'comp1', name: 'Alex Johnson', image: require('../images/ocean.jpg') },
  { id: 'comp2', name: 'Sophie Martinez', image: require('../images/female.jpg') },
  { id: 'comp3', name: 'Muthukumar S', image: require('../images/mountain.jpg') },
  { id: 'comp4', name: 'Yuki Tanaka', image: require('../images/female.jpg') },
];

export default function Profile({ navigation, route }) {
  const [activeTab, setActiveTab] = useState('Collections');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isMemoryModalVisible, setMemoryModalVisible] = useState(false);
  const [isAddToCollectionModalVisible, setAddToCollectionModalVisible] = useState(false);


  const handleNext = () => navigation.navigate("ProfileCollection");


  useEffect(() => {
    if (route.params?.showMemoryModal) {
      setMemoryModalVisible(true);
      navigation.setParams({ showMemoryModal: false });
    }
  }, [route.params?.showMemoryModal]);

  const handleMemoryAddToCollection = () => {
    setMemoryModalVisible(false); // Close the memory modal
    setAddToCollectionModalVisible(true); // Open the collection flow
  };

  const handleMemoryDoItLater = () => setMemoryModalVisible(false);

  // This handler is called when the user finishes the "Add to Collection" flow
  const handleCreateNewCollection = (data) => {
    console.log('Collection created/selected with data:', data);
    // You can add logic here to handle the new collection data
    setAddToCollectionModalVisible(false); // Close the flow
    // The memory modal is already closed by `handleMemoryAddToCollection`
  };

  const tabs = ['Gallery', 'Collections', 'Tagged'];
  const allData = {
    Collections: [
      { id: '1', title: 'Top 10 Cafes in osaka, Japan', authorName: 'yuki', authorImage: require('../images/female.jpg'), images: [require('../images/female.jpg'), require('../images/ocean.jpg'), require('../images/mountain.jpg'),] },
      { id: '2', title: 'Top 10 Cafes in osaka, Japan', authorName: 'yuki', authorImage: require('../images/female.jpg'), images: [require('../images/female.jpg'), require('../images/ocean.jpg'), require('../images/mountain.jpg'),] },
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
            <View className="flex-row items-center gap-x-8 mt-[20px]">
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
                    <TouchableOpacity onPress={handleNext} className="flex-1 bg-[#2D2D3A] rounded-2xl p-3">
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

        <Modal visible={showSuccessModal} transparent={true} animationType="slide" onRequestClose={() => setShowSuccessModal(false)}>
          <TouchableWithoutFeedback onPress={() => setShowSuccessModal(false)}>
            <View className="flex-1 flex justify-end items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
              <TouchableWithoutFeedback>
                <View className="bg-[#1A132A] p-6 rounded-tl-[20px] rounded-tr-[20px] items-center w-full">
                  <Text className="text-white text-[20px] font-bold mb-2.5">Congrats</Text>
                  <Text className="text-[#AAA6C3] text-[14px] text-center mb-6">Successfully updated your profile picture</Text>
                  <TouchableOpacity className='bg-[#F7F7FB] py-3.5 px-10 rounded-full w-full items-center' onPress={() => setShowSuccessModal(false)}>
                    <Text className="text-black font-bold text-[16px]">Continue</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <MemorySuccessModal
          visible={isMemoryModalVisible}
          onClose={handleMemoryDoItLater}
          onAddToCollection={handleMemoryAddToCollection}
        />

        <AddToCollectionFlow
          visible={isAddToCollectionModalVisible}
          onClose={() => setAddToCollectionModalVisible(false)}
          onCreate={handleCreateNewCollection}
          collectionsData={collectionsData}
          allCompanions={allCompanions}
        />

      </ImageBackground>
      <CustomTabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
});