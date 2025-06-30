import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

// This component was moved from the Profile screen for better organization
const CheckmarkIcon = () => (
  <View className="w-6 h-6 bg-yellow-400 rounded-full items-center justify-center">
    <Text className="text-black font-bold text-sm">✓</Text>
  </View>
);

// The required image for the modal
const memoryImage = require('../../images/female.jpg');

const MemorySuccessModal = ({ visible, onClose, onAddToCollection }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
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
                  <TouchableOpacity onPress={onClose} className="bg-[#1D1C20] flex-1 py-4 rounded-full items-center">
                    <Text className="text-white text-base font-semibold">I'll do it later</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onAddToCollection} className="bg-[#A729F5] flex-1 py-4 rounded-full items-center">
                    <Text className="text-white text-base font-semibold">Add to collection</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default MemorySuccessModal;