import React, { useState } from 'react';
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

export default function Profile() {
  const [activeTab, setActiveTab] = useState('Collections');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const tabs = ['Gallery', 'Collections', 'Tagged'];

  const allData = {
    Collections: [
      {
        id: '1',
        title: 'Top 10 Cafes in osaka, Japan',
        authorName: 'yuki',
        authorImage: require('../../images/female.jpg'),
        images: [
          require('../../images/female.jpg'),
          require('../../images/ocean.jpg'),
          require('../../images/mountain.jpg'),
        ],
      },
      {
        id: '2',
        title: 'Top 10 Cafes in osaka, Japan',
        authorName: 'yuki',
        authorImage: require('../../images/female.jpg'),
        images: [
          require('../../images/female.jpg'),
          require('../../images/ocean.jpg'),
          require('../../images/mountain.jpg'),
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
      <ImageBackground className='flex-1' source={require('../../images/background.png')}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View className="p-5">
            <View className="flex-row items-center gap-x-8 p-6 mt-[20px]">
              <TouchableOpacity
                onPress={handleOpenGallery}
                style={{
                  borderStyle: "dashed",
                  borderWidth: 1.6,
                  borderColor: "#fff",
                  opacity: 0.5,
                  backgroundColor: "#281E3B",
                  overflow: "hidden",
                }}
                className="w-32 h-32 rounded-full justify-center items-center"
              >
                {selectedImage ? (
                  <Image
                    source={{ uri: selectedImage }}
                    style={{ width: '100%', height: '100%', borderRadius: 999 }}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={require('../../images/face_2.png')}
                    style={{ width: 24, height: 24 }}
                  />
                )}
              </TouchableOpacity>

              <View className="flex-col flex-1">
                <Text className="text-white text-[20px] font-bold" numberOfLines={1} adjustsFontSizeToFit>
                  Anna Watson
                </Text>
                <Text className="text-slate-400 text-lg mt-1 mb-3">@annawat</Text>
                <TouchableOpacity
                  className="flex-row items-center justify-center gap-x-2 bg-[#3A3545] p-3 rounded-full active:bg-[#5a4f7c] min-w-[124px] max-w-[130px]"
                  activeOpacity={0.8}
                >
                  <Image source={require('../../images/pencil_fill.png')} style={{ width: 18, height: 18 }} />
                  <Text className="text-white text-[12px] font-medium">Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="mt-8">
              <View className="flex-row mx-4">
                {tabs.map((tabName) => (
                  <TouchableOpacity
                    key={tabName}
                    onPress={() => setActiveTab(tabName)}
                    className="flex-1 items-center"
                  >
                    <Text
                      className={`font-semibold text-sm ${activeTab === tabName ? 'text-white' : 'text-gray-400'}`}
                    >
                      {tabName}
                    </Text>
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
                          <Image
                            source={item.images[2]}
                            className="absolute top-0 left-0 w-full h-full rounded-xl object-cover"
                            style={{
                              transform: [{ rotate: '-15deg' }],
                              borderColor: 'rgba(255, 255, 255, 0.75)',
                              borderWidth: 3,
                            }}
                          />
                          <Image
                            source={item.images[1]}
                            className="absolute top-0 left-0 w-full h-full rounded-xl object-cover"
                            style={{
                              transform: [{ rotate: '8deg' }],
                              borderColor: 'rgba(255, 255, 255, 0.75)',
                              borderWidth: 3,
                            }}
                          />
                          <Image
                            source={item.images[0]}
                            className="absolute top-0 left-0 w-full h-full rounded-xl object-cover"
                            style={{
                              borderColor: 'rgba(255, 255, 255, 0.75)',
                              borderWidth: 3,
                            }}
                          />
                        </View>
                      </View>
                      <Text className="text-white font-bold text-sm mb-2 h-12" numberOfLines={2}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>



            ) : (
              <View className="justify-center items-center mt-20">
                <Text className="text-gray-400 text-lg">
                  No {activeTab.toLowerCase()} items yet.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* ✅ Congrats Modal */}
        <Modal
          isVisible={showSuccessModal}
          onBackdropPress={() => setShowSuccessModal(false)}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={0.6}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Congrats</Text>
            <Text style={styles.modalSubtitle}>Successfully updated your profile picture</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowSuccessModal(false)}
            >
              <Text style={styles.modalButtonText}>Continue</Text>
            </TouchableOpacity>
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
  modalContent: {
    backgroundColor: '#1A132A',
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtitle: {
    color: '#AAA6C3',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButton: {
    backgroundColor: '#F7F7FB',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 999,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
