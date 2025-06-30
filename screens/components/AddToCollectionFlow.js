import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    TextInput,
    FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';

const AddToCollectionFlow = ({ visible, onClose, onCreate, collectionsData, allCompanions }) => {
    // ---- STATE MANAGEMENT ----
    
    // This new state controls which view is visible inside the single modal
    // 'main' -> The initial list of collections
    // 'newCollection' -> The "Add New Collection" form
    // 'addCompanion' -> The "Add Companion" list
    const [currentView, setCurrentView] = useState('main');

    // State for data and inputs (remains the same)
    const [selectedCollectionId, setSelectedCollectionId] = useState(collectionsData[0]?.id || null);
    const [searchQuery, setSearchQuery] = useState('');
    const [newCollectionName, setNewCollectionName] = useState('');
    const [isPublicPost, setIsPublicPost] = useState(false);
    const [companionSearchQuery, setCompanionSearchQuery] = useState('');
    const [selectedCompanionIds, setSelectedCompanionIds] = useState(new Set());
    const [finalCompanions, setFinalCompanions] = useState([]);

    const filteredCollections = collectionsData.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()));
    const filteredCompanions = allCompanions.filter(c => c.name.toLowerCase().includes(companionSearchQuery.toLowerCase()));

    // ---- HANDLERS ----

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
        setCurrentView('newCollection'); // Go back to the new collection view
    };
    
    // Resets all state and closes the modal completely
    const resetAllStateAndClose = () => {
        setSearchQuery('');
        setNewCollectionName('');
        setIsPublicPost(false);
        setCompanionSearchQuery('');
        setSelectedCompanionIds(new Set());
        setFinalCompanions([]);
        setCurrentView('main'); // Reset to the main view for next time
        onClose(); // Call the parent's close function
    };

    // Final "Create" action
    const handleCreate = () => {
        onCreate({
            selectedCollectionId: selectedCollectionId,
            newCollection: {
                name: newCollectionName,
                isPublic: isPublicPost,
                companions: finalCompanions,
            },
        });
        resetAllStateAndClose();
    };

    // ---- RENDER FUNCTIONS FOR EACH VIEW ----

    // Renders the main view with the list of collections
    const renderMainView = () => (
        <>
            <View className="relative flex-row items-center justify-center p-4">
                <TouchableOpacity onPress={resetAllStateAndClose} className="absolute left-4 bg-[#1D1C20] p-2 rounded-full">
                    <Ionicons name="close" size={20} color="white" />
                </TouchableOpacity>
                <Text className="text-white font-bold text-lg">Add to collection</Text>
            </View>
            <View className="px-4 mt-2 mb-4 space-y-4">
                <View className="flex-row items-center bg-[#1D1C20] rounded-[20px] px-3">
                    <Ionicons name="search" size={20} color="#8E8E93" />
                    <TextInput placeholder="Search by name" placeholderTextColor="#8E8E93" className="flex-1 h-12 text-[#A4A6AB] text-base ml-2" value={searchQuery} onChangeText={setSearchQuery} />
                </View>
                {/* This button now changes the view instead of opening a new modal */}
                <TouchableOpacity onPress={() => setCurrentView('newCollection')} className="flex-row items-center bg-[#1D1C20] rounded-[20px] p-4">
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
            <TouchableOpacity className="py-6 items-center mt-2" onPress={handleCreate}>
                <Text className="text-white text-base font-semibold">Create</Text>
            </TouchableOpacity>
        </>
    );

    // Renders the "Add New Collection" view
    const renderAddNewCollectionView = () => (
        <>
            <View className="relative flex-row items-center justify-center p-4">
                 {/* This button now goes back to the main view */}
                <TouchableOpacity onPress={() => setCurrentView('main')} className="absolute left-4 bg-[#1D1C20] p-2 rounded-full">
                    <Ionicons name="chevron-back" size={20} color="white" />
                </TouchableOpacity>
                <Text className="text-white font-bold text-lg">Add New Collection</Text>
            </View>
            <View className="mt-4 space-y-6 px-4">
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
                            {isPublicPost ? (<Ionicons name="checkmark" size={18} color="#BDAEFF" />) : (<Ionicons name="close" size={18} color="#9E9E9E" />)}
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text className="text-[#D8D2FF] text-sm mb-2">Companion</Text>
                    <View className="flex-row items-center gap-x-2">
                        {finalCompanions.map(c => (<Image style={{ borderColor: "#fff", borderWidth: 2 }} key={c.id} source={c.image} className="w-12 h-12 rounded-full" />))}
                        <TouchableOpacity onPress={() => setCurrentView('addCompanion')} style={{ borderWidth: 1.3, borderStyle: 'dashed', borderColor: '#757087' }} className="w-12 h-12 rounded-full items-center justify-center">
                            <Icon name="user-plus" size={16} color="#BDAEFF" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <TouchableOpacity className="py-6 items-center mt-8" onPress={handleCreate}>
                <Text className="text-white text-base font-semibold">Create</Text>
            </TouchableOpacity>
        </>
    );

    // Renders the "Add Companion" view
    const renderAddCompanionView = () => (
        <>
            <View className="relative flex-row items-center justify-center p-4">
                <TouchableOpacity onPress={() => setCurrentView('newCollection')} className="absolute left-4 bg-[#1D1C20] p-2 rounded-full">
                    <Ionicons name="chevron-back" size={20} color="white" />
                </TouchableOpacity>
                <Text className="text-white font-bold text-lg">Add companion</Text>
            </View>
            <View className="px-4 mt-2 mb-4">
                <View className="flex-row items-center bg-[#1D1C20] rounded-lg px-3">
                    <Ionicons name="search" size={20} color="#8E8E93" />
                    <TextInput placeholder="Search by name" placeholderTextColor="#8E8E93" className="flex-1 h-12 text-white ml-2" value={companionSearchQuery} onChangeText={setCompanionSearchQuery} />
                </View>
            </View>
            <FlatList data={filteredCompanions} keyExtractor={item => item.id} style={{ maxHeight: 300, minHeight: 150 }} renderItem={({ item }) => (
                <TouchableOpacity className="flex-row items-center justify-between px-4 py-3" onPress={() => handleToggleCompanion(item.id)}>
                    <View className="flex-row items-center gap-x-3">
                        <Image style={{ borderWidth: 2, borderColor: "#fff" }} source={item.image} className="w-12 h-12 rounded-full" />
                        <Text className="text-white text-base">{item.name}</Text>
                    </View>
                    {selectedCompanionIds.has(item.id) ? (
                        <View className="w-6 h-6 bg-yellow-400 rounded-full items-center justify-center"><Ionicons name="checkmark" size={16} color="white" /></View>
                    ) : (
                        <View className="w-6 h-6 rounded-full border-2 border-gray-500" />
                    )}
                </TouchableOpacity>
            )} />
            <TouchableOpacity className="py-6 items-center" onPress={handleConfirmCompanions}>
                <Text className="text-white text-base font-semibold">Confirm</Text>
            </TouchableOpacity>
        </>
    );
    
    // A helper function to decide which view to render
    const renderContent = () => {
        switch (currentView) {
            case 'newCollection':
                return renderAddNewCollectionView();
            case 'addCompanion':
                return renderAddCompanionView();
            default:
                return renderMainView();
        }
    }

    return (
        // The SINGLE modal that wraps all the views
        <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={resetAllStateAndClose}>
            <TouchableWithoutFeedback onPress={resetAllStateAndClose}>
                <View className="flex-1 flex justify-end items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
                    <TouchableWithoutFeedback>
                        <View className="bg-[#111013] w-full rounded-t-3xl pt-2">
                           {/* Conditionally render the content based on the current view state */}
                           {renderContent()}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default AddToCollectionFlow;