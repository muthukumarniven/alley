
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import AppNavigator from './AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
