import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


import CreateAccount from './screens/CreateAccount';
import CodeVerification from './screens/CodeVerification';
import CreateProfile from './screens/CreateProfile';
import AddCollection from './screens/AddCollection';
import Notification from './screens/Notification';
import SaveMemory from './screens/SaveMemory';
import Home from './screens/Home';
import Explore from './screens/Explore';
import Saved from './screens/Saved';
import Profile from './screens/Profile'
import Collections from './screens/Collections';

import CustomTabBar from './screens/common/TabNavigation';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='CreateAccount' component={CreateAccount} />
      <Stack.Screen name='CodeVerification' component={CodeVerification} />
      <Stack.Screen name='CreateProfile' component={CreateProfile} />
      <Stack.Screen name='AddCollection' component={AddCollection} />
      <Stack.Screen name='Notification' component={Notification} />
      <Stack.Screen name='SaveMemory' component={SaveMemory} />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Explore' component={Explore} />
      <Stack.Screen name='Saved' component={Saved} />
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='Collections' component={Collections} />
    </Stack.Navigator>
  );
}
