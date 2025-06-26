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
  TextInput,
  FlatList,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTabBar from './common/TabNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CheckmarkIcon = () => (
  <View className="w-6 h-6 bg-yellow-400 rounded-full items-center justify-center">
    <Text className="text-black font-bold text-sm">✓</Text>
  </View>
);

const collectionsData = [
  { id: 'c1', title: 'Top 5 Kamakura peaceful cafes zfsdf zxcsdf sdfsdfv sfsd sdf', imageCount: 2, image: require('../images/ocean.jpg') },
  { id: 'c2', title: 'Tokyo Nightlife', imageCount: 15, image: require('../images/mountain.jpg') },
  { id: 'c3', title: 'Kyoto Temples', imageCount: 8, image: require('../images/female.jpg') },
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
  const [selectedCollectionId, setSelectedCollectionId] = useState('c1');
  const [searchQuery, setSearchQuery] = useState('');

  const [isAddNewCollectionModalVisible, setAddNewCollectionModalVisible] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [isPublicPost, setIsPublicPost] = useState(false);

  const [isAddCompanionModalVisible, setAddCompanionModalVisible] = useState(false);
  const [companionSearchQuery, setCompanionSearchQuery] = useState('');
  const [selectedCompanionIds, setSelectedCompanionIds] = useState(new Set());
  const [finalCompanions, setFinalCompanions] = useState([]);

  const memoryImage = require('../images/female.jpg');

  useEffect(() => {
    if (route.params?.showMemoryModal) {
      setMemoryModalVisible(true);
      navigation.setParams({ showMemoryModal: false });
    }
  }, [route.params?.showMemoryModal]);

  const handleMemoryAddToCollection = () => setAddToCollectionModalVisible(true);
  const handleMemoryDoItLater = () => setMemoryModalVisible(false);
  const handleConfirmAddToCollection = () => setAddToCollectionModalVisible(false);
  const handleOpenAddNewCollection = () => setAddNewCollectionModalVisible(true);

  const handleCreateNewCollection = () => {
    setAddNewCollectionModalVisible(false);
    setAddToCollectionModalVisible(false);
    setMemoryModalVisible(false);
    setNewCollectionName('');
    setIsPublicPost(false);
    setFinalCompanions([]);
    setSelectedCompanionIds(new Set());
  };

  const handleOpenCompanionModal = () => setAddCompanionModalVisible(true);

  const handleToggleCompanion = (companionId) => {
    const newSelection = new Set(selectedCompanionIds);
    if (newSelection.has(companionId)) {
      newSelection.delete(companionId);
    } else {
      newSelection.add(companionId);
    }
    setSelectedCompanionIds(newSelection);
  };

  const handleConfirmCompanions = () => {
    const selected = allCompanions.filter(c => selectedCompanionIds.has(c.id));
    setFinalCompanions(selected);
    setAddCompanionModalVisible(false);
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

  // --- THIS FUNCTION IS NOW RESTORED ---
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

  const filteredCollections = collectionsData.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredCompanions = allCompanions.filter(c => c.name.toLowerCase().includes(companionSearchQuery.toLowerCase()));

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

        <Modal visible={isMemoryModalVisible} transparent={true} animationType="slide" onRequestClose={() => setMemoryModalVisible(false)}>
          <TouchableWithoutFeedback onPress={() => setMemoryModalVisible(false)}>
            <View className="flex-1 flex justify-end items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
              <TouchableWithoutFeedback>
                <View className="bg-[#111013] rounded-t-3xl items-center pt-4 pb-8 w-full">
                  <Image source={memoryImage} className="w-24 h-24 rounded-2xl -mt-16 mb-6 border-4 border-[#1C1C1E]" />
                  <View className="px-6 w-full">
                    <View className="bg-[#1D1C20] flex-row items-center p-3 pl-4 rounded-full">
                      <CheckmarkIcon />
                      <Text className="text-white text-base font-semibold ml-3">Your memory saved successfully.</Text>
                    </View>
                    <Text className="text-zinc-400 text-base text-center mt-5 mb-6 leading-6">Add your saved memory into one or more collections and make it public if you wish to share it with the world.</Text>
                    <View className="flex-row justify-between space-x-3">
                      <TouchableOpacity onPress={handleMemoryDoItLater} className="bg-[#1D1C20] flex-1 py-4 rounded-full items-center">
                        <Text className="text-white text-base font-semibold">I'll do it later</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleMemoryAddToCollection} className="bg-[#A729F5] flex-1 py-4 rounded-full items-center">
                        <Text className="text-white text-base font-semibold">Add to collection</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal visible={isAddToCollectionModalVisible} transparent={true} animationType="slide" onRequestClose={() => setAddToCollectionModalVisible(false)}>
          <TouchableWithoutFeedback onPress={() => setAddToCollectionModalVisible(false)}>
            <View className="flex-1 flex justify-end items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
              <TouchableWithoutFeedback>
                <View className="bg-[#111013] w-full rounded-t-3xl pt-2">
                  <View className="relative flex-row items-center justify-center p-4">
                    <TouchableOpacity onPress={() => setAddToCollectionModalVisible(false)} className="absolute left-4 bg-[#1D1C20] p-2 rounded-full">
                      <Ionicons name="close" size={20} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white font-bold text-lg">Add to collection</Text>
                  </View>
                  <View className="px-4 mt-2 mb-4 space-y-4">
                    <View className="flex-row items-center bg-[#1D1C20] rounded-[20px] px-3">
                      <Ionicons name="search" size={20} color="#8E8E93" />
                      <TextInput placeholder="Search by name" placeholderTextColor="#8E8E93" className="flex-1 h-12 text-[#A4A6AB] text-base ml-2" value={searchQuery} onChangeText={setSearchQuery} />
                    </View>
                    <TouchableOpacity onPress={handleOpenAddNewCollection} className="flex-row items-center bg-[#1D1C20] rounded-[20px] p-4">
                      <Ionicons name="add" size={24} color="#6F27FF" />
                      <Text className="text-white text-base ml-3 font-semibold">New Collection</Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList data={filteredCollections} keyExtractor={item => item.id} style={{ maxHeight: 250 }} renderItem={({ item }) => (
                    <TouchableOpacity className="flex-row items-center justify-between px-4 py-3" onPress={() => setSelectedCollectionId(item.id)}>
                      <View className="flex-row items-center gap-x-3 flex-shrink">
                        <Image style={{ borderColor: "#fff", borderWidth: 2 }} source={item.image} className="w-12 h-12 rounded-full" />
                        <View>
                          <Text className="text-white text-base w-[250px]" numberOfLines={1}>{item.title}</Text>
                          <Text className="text-[#4F4A5A] text-sm">{item.imageCount} images</Text>
                        </View>
                      </View>
                      {selectedCollectionId === item.id ? (
                        <View className="w-6 h-6 bg-yellow-400 rounded-full items-center justify-center"><Ionicons name="checkmark" size={16} color="#fff" /></View>
                      ) : (
                        <View className="w-6 h-6 rounded-full border-2 border-gray-500" />
                      )}
                    </TouchableOpacity>
                  )} />
                  <TouchableOpacity className="py-6 items-center mt-2" onPress={handleConfirmAddToCollection}>
                    <Text className="text-white text-base font-semibold">Add to my collection</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal visible={isAddNewCollectionModalVisible} transparent={true} animationType="slide" onRequestClose={() => setAddNewCollectionModalVisible(false)}>
          <TouchableWithoutFeedback onPress={() => setAddNewCollectionModalVisible(false)}>
            <View className="flex-1 flex justify-end items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
              <TouchableWithoutFeedback>
                <View className="bg-[#111013] w-full rounded-t-3xl p-4 pt-2">
                  <View className="relative flex-row items-center justify-center p-4">
                    <TouchableOpacity onPress={() => setAddNewCollectionModalVisible(false)} className="absolute left-0 bg-[#1D1C20] p-2 rounded-full">
                      <Ionicons name="close" size={20} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white font-bold text-lg">Add New Collection</Text>
                  </View>
                  <View className="mt-4 space-y-6 px-2">
                    <View>
                      <Text className="text-[#D8D2FF] text-sm mb-2">Collection name</Text>
                      <View className="flex-row items-center bg-[#1D1C20] rounded-xl px-4">
                        <TextInput placeholder="Name" placeholderTextColor="#8A8A9E" className="flex-1 h-14 text-white text-base" value={newCollectionName} onChangeText={setNewCollectionName} />
                        <Ionicons name="sparkles" size={20} color="#BDAEFF" />
                      </View>
                    </View>
                    <View className="flex-row justify-between items-center">
                      <Text className="text-[#D8D2FF] text-sm">Post as public post</Text>
                      <TouchableOpacity onPress={() => setIsPublicPost(!isPublicPost)} className={`w-[50px] h-[30px] rounded-full justify-center ${isPublicPost ? 'bg-[#BDAEFF]' : 'bg-[#5A5A72]'}`}>
                        <View className={`w-[26px] h-[26px] rounded-full justify-center items-center ${isPublicPost ? 'bg-white self-end mr-0.5' : 'bg-[#3A3A4D] self-start ml-0.5'}`}>
                          {!isPublicPost && <Ionicons name="close" size={18} color="#9E9E9E" />}
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Text className="text-[#D8D2FF] text-sm mb-2">Companion</Text>
                      <View className="flex-row items-center gap-x-2">
                        {finalCompanions.map(c => (
                          <Image key={c.id} source={c.image} className="w-12 h-12 rounded-full" />
                        ))}
                        <TouchableOpacity onPress={handleOpenCompanionModal} style={{ borderWidth: 1.7, borderStyle: 'dashed', borderColor: '#757087' }} className="w-12 h-12 rounded-full items-center justify-center">
                          <Icon name="user-plus" size={16} color="#BDAEFF" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity className="py-6 items-center mt-8" onPress={handleCreateNewCollection}>
                    <Text className="text-white text-base font-semibold">Create</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal visible={isAddCompanionModalVisible} transparent={true} animationType="slide" onRequestClose={() => setAddCompanionModalVisible(false)}>
          <TouchableWithoutFeedback onPress={() => setAddCompanionModalVisible(false)}>
            <View className="flex-1 flex justify-end items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
              <TouchableWithoutFeedback>
                <View className="bg-[#111013] w-full rounded-t-3xl pt-2">
                  <View className="relative flex-row items-center justify-center p-4">
                    <TouchableOpacity onPress={() => setAddCompanionModalVisible(false)} className="absolute left-4 bg-[#1D1C20] p-2 rounded-full">
                      <Ionicons name="close" size={20} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white font-bold text-lg">Add companion</Text>
                  </View>
                  <View className="px-4 mt-2 mb-4">
                    <View className="flex-row items-center bg-[#1D1C20] rounded-lg px-3">
                      <Ionicons name="search" size={20} color="#8E8E93" />
                      <TextInput placeholder="Search by name" placeholderTextColor="#8E8E93" className="flex-1 h-12 text-white ml-2" value={companionSearchQuery} onChangeText={setCompanionSearchQuery} />
                    </View>
                  </View>
                  <FlatList
                    data={filteredCompanions}
                    keyExtractor={item => item.id}
                    style={{ maxHeight: 300, minHeight: 150 }}
                    renderItem={({ item }) => (
                      <TouchableOpacity className="flex-row items-center justify-between px-4 py-3" onPress={() => handleToggleCompanion(item.id)}>
                        <View className="flex-row items-center gap-x-3">
                          <Image style={{ borderWidth: 2, borderColor: "#fff" }} source={item.image} className="w-12 h-12 rounded-full" />
                          <Text className="text-white text-base">{item.name}</Text>
                        </View>
                        {selectedCompanionIds.has(item.id) ? (
                          <View className="w-6 h-6 bg-yellow-400 rounded-full items-center justify-center">
                            <Ionicons name="checkmark" size={16} color="white" />
                          </View>
                        ) : (
                          <View className="w-6 h-6 rounded-full border-2 border-gray-500" />
                        )}
                      </TouchableOpacity>
                    )}
                  />
                  <TouchableOpacity className="py-6 items-center" onPress={handleConfirmCompanions}>
                    <Text className="text-white text-base font-semibold">Confirm</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

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